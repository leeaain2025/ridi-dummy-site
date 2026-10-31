/* 메인(도서 추천) 페이지 렌더 */
(function () {
  var R = window.RIDI, esc = R.esc;
  R.mount("home");

  var hero = document.getElementById("hero");
  var banners = [
    { t: "2026 노벨문학상,\n앤 카슨", p: "수상 기념 전 작품 30% 할인", g: "linear-gradient(135deg,#8e2a2a,#d9775c)", b: "이벤트" },
    { t: "킹의 새로운 최애\n'홀리' 시리즈 신간", p: "스티븐 킹 신작 출간 기념", g: "linear-gradient(135deg,#1b2440,#4a5f9e)", b: "신간" },
    { t: "종이책 대비 50%▼\n김용 3부작 합본 오픈", p: "사조영웅전 · 신조협려 · 의천도룡기", g: "linear-gradient(135deg,#2f3a1e,#7f9a4c)", b: "합본" }
  ];
  hero.innerHTML = '<div class="hero-track">' + banners.map(function (b) {
    return '<a class="banner" href="#" style="background:' + b.g + '"><span class="bbadge">' + b.b + "</span><h3>" + esc(b.t) + "</h3><p>" + esc(b.p) + "</p></a>";
  }).join("") + '</div><div class="hero-dots"><i class="on"></i><i></i><i></i><i></i><i></i></div>';

  var quick = [["베스트", "🏆", "bestseller.d954cea8b85b182e7cfbffdb9519bb07"], ["신간", "✨", "new.d0c590b8b2fe4f364eadecb600491294"], ["이벤트", "🎁", "event.895183ca4353ae354bca3f5e896cec55"], ["쿠폰", "🎟️", "coupon.3934aadf872c47ffcc59586ce12c6c34"], ["리디 ONLY", "💎", "only.7d71bce5c941b4fcb325ffac8ae50410"], ["대여", "⏱️", "rent.f61ca0abf4a6d0d5eb18fc65f3f3902b"], ["기획전 지도", "🗺️", "promotion_map.3199d6755aef129b824783b255e3f1a1"]];
  document.getElementById("quick").innerHTML = quick.map(function (q) {
    return '<a href="#"><span class="qi"><img src="https://active.ridibooks.com/quick-menu/light/' + q[2] + '.png" alt="" onerror="this.replaceWith(document.createTextNode(\'' + q[1] + '\'))"></span>' + q[0] + "</a>";
  }).join("");

  function head(s) {
    return '<div class="section-h"><div><h2>' + esc(s.title).replace(/\n/g, "<br>") + (s.type === "ai" ? '<span class="ai">AI</span>' : "") + (s.badge ? '<span class="ai">' + s.badge + "</span>" : "") + "</h2>" + (s.sub ? "<p>" + esc(s.sub) + "</p>" : "") + '</div><a class="more" href="#">더보기 ›</a></div>';
  }
  function row(s, rank, lg) {
    var books = R.byId(s.books);
    return '<section class="section">' + head(s) + '<div class="row"><button class="nav-btn prev" aria-label="이전">‹</button><button class="nav-btn next" aria-label="다음">›</button><div class="track">' +
      books.map(function (b, i) { return R.bookHTML(b, { rank: rank ? i + 1 : 0, lg: lg }); }).join("") + "</div></div></section>";
  }

  var html = R.SECTIONS.map(function (s) {
    if (s.type === "row" || s.type === "ai") return row(s, false, false);
    if (s.type === "rank") return row(s, true, false);
    if (s.type === "multi") return '<section class="section">' + head(s) + '<div class="grid-multi">' + R.byId(s.books).map(function (b) { return R.bookHTML(b); }).join("") + "</div></section>";
    if (s.type === "hook") {
      var b = R.byId([s.book])[0];
      return '<section class="section">' + head(s) + '<div class="hook">' + R.coverHTML(b) + "<div><blockquote>" + esc(s.quote) + '</blockquote><div class="meta">' + esc(s.meta) + '</div><a class="cta" href="#">작품 보러가기</a></div></div></section>';
    }
    if (s.type === "events") return '<section class="section"><div class="event-row">' + s.items.map(function (e) { return '<a class="event-card" href="#" style="background:' + e.g + '"><h3>' + esc(e.t) + "</h3><p>" + esc(e.p) + "</p></a>"; }).join("") + "</div></section>";
    if (s.type === "keywords") return '<section class="section">' + head(s) + '<div class="keywords">' + s.items.map(function (k) { return '<a href="#">' + esc(k) + "</a>"; }).join("") + "</div></section>";
    return "";
  }).join("");
  document.getElementById("sections").innerHTML = html;

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".nav-btn");
    if (!btn) return;
    var track = btn.parentElement.querySelector(".track");
    track.scrollBy({ left: btn.classList.contains("next") ? 640 : -640, behavior: "smooth" });
  });
})();
