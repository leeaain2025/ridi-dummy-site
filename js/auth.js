/* 로컬스토리지 기반 더미 인증. 서버 없음. */
(function () {
  var ACC = "ridi_demo_account", SES = "ridi_demo_session";
  function read(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var Auth = {
    account: function () {
      var a = read(ACC);
      if (!a) { a = Object.assign({}, RIDI.USER_SEED); write(ACC, a); }
      return a;
    },
    reset: function () { localStorage.removeItem(ACC); localStorage.removeItem(SES); },
    login: function (id, pw, keep) {
      var a = Auth.account();
      if (id.trim() === a.id && pw === a.password) {
        write(SES, { id: a.id, at: Date.now(), keep: !!keep });
        return { ok: true };
      }
      return { ok: false, msg: "아이디 또는 비밀번호가 올바르지 않습니다." };
    },
    logout: function () { localStorage.removeItem(SES); },
    isLoggedIn: function () { return !!read(SES); },
    user: function () { return Auth.isLoggedIn() ? Auth.account() : null; },
    changePassword: function (cur, next) {
      var a = Auth.account();
      if (cur !== a.password) return { ok: false, field: "cur", msg: "현재 비밀번호가 일치하지 않습니다." };
      var v = Auth.validatePassword(next, a.id);
      if (!v.ok) return { ok: false, field: "next", msg: v.msg };
      if (cur === next) return { ok: false, field: "next", msg: "현재 비밀번호와 다른 비밀번호를 입력해 주세요." };
      a.password = next; a.pwChangedAt = Date.now();
      write(ACC, a);
      return { ok: true };
    },
    validatePassword: function (pw, id) {
      var len = pw.length >= 8 && pw.length <= 32;
      var kinds = [/[A-Za-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(function (r) { return r.test(pw); }).length;
      var noSpace = !/\s/.test(pw);
      var notId = !id || pw.toLowerCase().indexOf(id.toLowerCase()) === -1;
      var ok = len && kinds >= 2 && noSpace && notId;
      var msg = !len ? "8자 이상 32자 이하로 입력해 주세요." : kinds < 2 ? "영문, 숫자, 특수문자 중 2가지 이상을 조합해 주세요." : !noSpace ? "공백은 사용할 수 없습니다." : !notId ? "아이디를 포함할 수 없습니다." : "";
      return { ok: ok, len: len, kinds: kinds >= 2, noSpace: noSpace, notId: notId, msg: msg };
    },
    requireLogin: function () {
      if (!Auth.isLoggedIn()) {
        location.replace("login.html?return_url=" + encodeURIComponent(location.pathname.split("/").pop() || "index.html"));
        return false;
      }
      return true;
    }
  };
  window.Auth = Auth;
})();
