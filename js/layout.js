/* 공통 헤더/푸터 + 표지 렌더 */
(function () {
  var R = window.RIDI;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  R.esc = esc;
  R.won = function (n) { return n.toLocaleString("ko-KR") + "원"; };

  R.coverHTML = function (b, opts) {
    opts = opts || {};
    var inner;
    if (b.cover) {
      inner = '<img src="' + esc(b.cover) + '" alt="' + esc(b.title) + '" loading="lazy">';
    } else {
      var p = R.PALETTES[b.pal % R.PALETTES.length];
      var words = b.title.split(" ");
      var lines = [], cur = "";
      words.forEach(function (w) { if ((cur + " " + w).trim().length > 9) { if (cur) lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); });
      if (cur) lines.push(cur);
      lines = lines.slice(0, 4);
      var ty = 60 - (lines.length - 1) * 9;
      var text = lines.map(function (l, i) { return '<text x="14" y="' + (ty + i * 18) + '" font-size="14" font-weight="800" fill="#fff" font-family="Apple SD Gothic Neo,Pretendard,Noto Sans KR,sans-serif">' + esc(l) + "</text>"; }).join("");
      inner = '<svg viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(b.title) + '">' +
        '<defs><linearGradient id="g' + b.id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + p[0] + '"/><stop offset="1" stop-color="' + p[1] + '"/></linearGradient></defs>' +
        '<rect width="140" height="200" fill="url(#g' + b.id + ')"/>' +
        '<rect x="0" y="0" width="8" height="200" fill="rgba(0,0,0,.25)"/>' +
        '<circle cx="110" cy="150" r="34" fill="rgba(255,255,255,.08)"/>' +
        text +
        '<text x="14" y="182" font-size="9" fill="rgba(255,255,255,.75)" font-family="Apple SD Gothic Neo,Pretendard,Noto Sans KR,sans-serif">' + esc(b.author) + "</text></svg>";
    }
    var tag = b.tag ? '<span class="tag ' + b.tag + '">' + (b.tag === "only" ? "ONLY" : b.tag === "new" ? "NEW" : "대여") + "</span>" : "";
    var rank = opts.rank ? '<span class="rank">' + opts.rank + "</span>" : "";
    return '<div class="cover">' + inner + tag + rank + "</div>";
  };

  R.bookHTML = function (b, opts) {
    opts = opts || {};
    var stars = "★".repeat(Math.round(b.rating));
    return '<a class="book' + (opts.lg ? " lg" : "") + '" href="#book-' + b.id + '" data-book="' + b.id + '">' +
      R.coverHTML(b, opts) +
      '<div class="t">' + esc(b.title) + "</div>" +
      '<div class="a">' + esc(b.author) + "</div>" +
      '<div class="r"><b>' + stars + "</b> " + b.rating.toFixed(1) + " (" + b.count.toLocaleString() + ")</div>" +
      '<div class="p"><span class="dc">' + b.dc + "%</span><span class=\"pr\">" + R.won(b.price) + '</span><span class="org">' + R.won(b.org) + "</span></div></a>";
  };

  R.header = function (active) {
    var u = window.Auth && Auth.user();
    var right = u
      ? '<button class="icon-btn" title="알림" aria-label="알림">🔔</button><button class="icon-btn" title="장바구니" aria-label="장바구니">🛒</button><a href="mypage.html" class="primary" id="nav-mypage">마이페이지</a>'
      : '<a href="login.html" id="nav-login">로그인</a><a href="login.html" class="primary">회원가입</a>';
    var nav = [["만화", "#"], ["웹툰", "#"], ["웹소설", "#"], ["도서", "index.html"], ["리디샵", "#", true]];
    var sub = ["추천", "기획전", "소설", "인문/사회/역사", "경영/경제", "자기계발", "에세이/시"];
    return '<header class="gnb"><div class="wrap gnb-top">' +
      '<a class="logo" href="index.html">RIDI<span>BOOKS</span></a>' +
      '<form class="search" role="search" onsubmit="return false"><span>🔍</span><input type="search" placeholder="제목, 출판사, 작가를 검색하세요" aria-label="검색"></form>' +
      '<div class="gnb-right">' + right + "</div></div>" +
      '<nav class="wrap gnb-nav">' + nav.map(function (n) { return '<a href="' + n[1] + '"' + (n[0] === "도서" ? ' class="on"' : "") + ">" + n[0] + (n[2] ? '<i class="new"></i>' : "") + "</a>"; }).join("") + "</nav>" +
      (active === "home" ? '<div class="snb"><ul class="wrap">' + sub.map(function (s, i) { return '<li><a href="' + (i === 0 ? "index.html" : "#") + '"' + (i === 0 ? ' class="on"' : "") + ">" + s + "</a></li>"; }).join("") + "</ul></div>" : "") +
      "</header>";
  };

  R.footer = function () {
    return '<footer class="footer"><div class="wrap">' +
      '<div class="links"><a href="#"><b>회사 소개</b></a><a href="#">이용약관</a><a href="#"><b>개인정보 처리방침</b></a><a href="#">청소년 보호정책</a><a href="#">사업자 정보</a><a href="#">고객센터</a><a href="#">제휴/제안</a></div>' +
      "<p>리디(주) &nbsp;|&nbsp; 대표 배기식 &nbsp;|&nbsp; 서울시 강남구 역삼로 180 마루180 &nbsp;|&nbsp; 사업자등록번호 120-87-27435 &nbsp;|&nbsp; 통신판매업신고 제 2009-서울강남-01535 호<br>© RIDI Corp.</p>" +
      '<div class="notice">이 사이트는 서비스 시연을 위해 리디북스 화면을 모방하여 만든 <b>더미 사이트</b>입니다. 실제 리디(주)와 무관하며, 결제·구독 등 어떤 실제 기능도 제공하지 않습니다.</div>' +
      "</div></footer>";
  };

  R.toast = function (msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2200);
  };

  R.mount = function (active) {
    var h = document.getElementById("header"), f = document.getElementById("footer");
    if (h) h.outerHTML = R.header(active);
    if (f) f.outerHTML = R.footer();
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (href === "#" || href.indexOf("#book-") === 0) { e.preventDefault(); R.toast("데모 사이트에서는 지원하지 않는 기능입니다."); }
    });
  };

  R.byId = function (ids) { return ids.map(function (id) { return R.BOOKS.find(function (b) { return b.id === id; }); }).filter(Boolean); };
})();
