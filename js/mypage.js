/* 마이페이지 계열(마이페이지/정보 변경/비밀번호 변경) 공통 렌더 */
(function () {
  var R = window.RIDI, esc = R.esc;

  R.renderMypage = function (active) {
    if (!Auth.requireLogin()) return;
    R.mount(active);
    var u = Auth.user();

    var side = document.getElementById("side");
    if (side) {
      var menu = [
        ["내 정보", [["mypage", "마이페이지", "mypage.html"], ["account", "정보 변경", "account.html"], ["password", "비밀번호 변경", "password.html"]]],
        ["콘텐츠", [["", "내 서재", "#", u.shelf.length], ["", "구매 목록", "#"], ["", "선호 작품", "#"], ["", "리뷰 관리", "#"]]],
        ["결제", [["", "리디캐시", "#", R.won(u.cash)], ["", "포인트", "#", u.point.toLocaleString() + "P"], ["", "쿠폰", "#", u.coupons + "장"], ["", "결제 수단", "#"]]],
        ["기타", [["", "알림 설정", "#"], ["", "고객센터", "#"], ["logout", "로그아웃", "#"]]]
      ];
      side.innerHTML = '<div class="me"><div class="avatar">' + esc(u.name[0]) + "</div><div><b>" + esc(u.name) + "</b><span>" + esc(u.id) + "</span></div></div>" +
        menu.map(function (g) {
          return '<div class="grp"><h4>' + g[0] + "</h4>" + g[1].map(function (m) {
            var cls = m[0] === active ? ' class="on"' : "";
            var attr = m[0] === "logout" ? ' id="logout"' : "";
            return "<a" + cls + attr + ' href="' + m[2] + '">' + m[1] + (m[3] !== undefined ? '<span class="cnt">' + m[3] + "</span>" : "") + "</a>";
          }).join("") + "</div>";
        }).join("");
      var lo = document.getElementById("logout");
      if (lo) lo.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); Auth.logout(); location.href = "index.html"; }, true);
    }

    var stats = document.getElementById("stats");
    if (stats) stats.innerHTML =
      '<div class="stat"><span>리디캐시</span><b>' + u.cash.toLocaleString() + "<small>원</small></b></div>" +
      '<div class="stat"><span>포인트</span><b>' + u.point.toLocaleString() + "<small>P</small></b></div>" +
      '<div class="stat"><span>쿠폰</span><b>' + u.coupons + "<small>장</small></b></div>" +
      '<div class="stat"><span>내 서재</span><b>' + u.shelf.length + "<small>권</small></b></div>";

    var pwDate = u.pwChangedAt ? new Date(u.pwChangedAt) : null;
    var pwText = pwDate ? pwDate.getFullYear() + "." + String(pwDate.getMonth() + 1).padStart(2, "0") + "." + String(pwDate.getDate()).padStart(2, "0") + " 변경" : "2024.11.02 변경";

    var info = document.getElementById("info");
    if (info) info.innerHTML =
      '<li><span class="k">아이디</span><span class="v">' + esc(u.id) + "</span><span></span></li>" +
      '<li><span class="k">이름</span><span class="v">' + esc(u.name) + "</span><span></span></li>" +
      '<li><span class="k">이메일</span><span class="v">' + esc(u.email) + '<span class="badge">인증 완료</span></span><span></span></li>' +
      '<li><span class="k">휴대폰</span><span class="v">' + esc(u.phone) + "</span><span></span></li>" +
      '<li><span class="k">비밀번호</span><span class="v">' + pwText + '</span><a class="act blue" href="password.html" id="go-password">비밀번호 변경</a></li>' +
      '<li><span class="k">가입일</span><span class="v">' + esc(u.joined) + "</span><span></span></li>";

    var ainfo = document.getElementById("account-info");
    if (ainfo) ainfo.innerHTML =
      '<li><span class="k">아이디</span><span class="v">' + esc(u.id) + "</span><span></span></li>" +
      '<li><span class="k">이름</span><span class="v">' + esc(u.name) + '</span><a class="act" href="#">변경</a></li>' +
      '<li><span class="k">이메일</span><span class="v">' + esc(u.email) + '<span class="badge">인증 완료</span></span><a class="act" href="#">변경</a></li>' +
      '<li><span class="k">휴대폰</span><span class="v">' + esc(u.phone) + '</span><a class="act" href="#">변경</a></li>' +
      '<li><span class="k">성인 인증</span><span class="v">인증 완료</span><span></span></li>';
    var ps = document.getElementById("pw-status");
    if (ps) ps.textContent = pwText;

    var shelf = document.getElementById("shelf");
    if (shelf) shelf.innerHTML = R.byId(u.shelf).map(function (b, i) {
      var pct = [72, 35, 100, 12, 58][i % 5];
      return '<a class="book" href="#book-' + b.id + '">' + R.coverHTML(b) + '<div class="t">' + esc(b.title) + '</div><div class="a">' + esc(b.author) + '</div><div class="prog"><i style="width:' + pct + '%"></i></div><div class="a">' + pct + "% 읽음</div></a>";
    }).join("");
  };

  R.initPasswordForm = function () {
    if (!Auth.isLoggedIn()) return;
    var u = Auth.user();
    var form = document.getElementById("pw-form"), alertBox = document.getElementById("pw-alert");
    var cur = document.getElementById("cur-pw"), np = document.getElementById("new-pw"), np2 = document.getElementById("new-pw2");
    var submit = document.getElementById("pw-submit"), rules = document.getElementById("rules"), hint2 = document.getElementById("pw2-hint");

    function check() {
      var v = Auth.validatePassword(np.value, u.id);
      ["len", "kinds", "noSpace", "notId"].forEach(function (k) { rules.querySelector('[data-k="' + k + '"]').classList.toggle("ok", np.value.length > 0 && v[k]); });
      var same = np2.value.length > 0 && np.value === np2.value;
      hint2.textContent = np2.value.length === 0 ? "" : same ? "새 비밀번호가 일치합니다." : "새 비밀번호가 일치하지 않습니다.";
      hint2.className = "hint " + (np2.value.length === 0 ? "" : same ? "ok" : "err");
      np2.classList.toggle("err", np2.value.length > 0 && !same);
      submit.disabled = !(cur.value.length > 0 && v.ok && same);
    }
    [cur, np, np2].forEach(function (i) { i.addEventListener("input", check); });

    document.querySelectorAll("[data-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = document.getElementById(this.dataset.toggle);
        i.type = i.type === "password" ? "text" : "password"; this.textContent = i.type === "password" ? "표시" : "숨김";
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alertBox.classList.remove("show"); cur.classList.remove("err"); np.classList.remove("err");
      check();
      if (submit.disabled) return;
      submit.disabled = true; submit.textContent = "변경 중...";
      setTimeout(function () {
        var r = Auth.changePassword(cur.value, np.value);
        if (!r.ok) {
          submit.disabled = false; submit.textContent = "비밀번호 변경";
          alertBox.textContent = r.msg; alertBox.classList.add("show");
          (r.field === "cur" ? cur : np).classList.add("err");
          (r.field === "cur" ? cur : np).focus();
          return;
        }
        document.getElementById("pw-panel").innerHTML =
          '<div class="success" id="pw-success"><div class="ic">✓</div><h4>비밀번호가 변경되었습니다.</h4><p>다음 로그인부터 새 비밀번호를 사용해 주세요.<br>보안을 위해 다른 기기에서는 다시 로그인이 필요합니다.</p>' +
          '<div class="form-actions" style="justify-content:center"><a class="btn blue sm" href="mypage.html">마이페이지로</a><a class="btn ghost sm" href="index.html">홈으로</a></div></div>';
        RIDI.toast("비밀번호가 변경되었습니다.");
      }, 500);
    });
  };
})();
