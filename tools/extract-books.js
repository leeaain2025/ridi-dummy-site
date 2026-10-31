/*
 * 실제 리디 표지/제목을 가져오는 스크립트.
 * 1) 크롬에서 https://ridibooks.com/ebook/recommendation 을 연다 (스크롤을 끝까지 내려 모든 섹션을 로드).
 * 2) 개발자도구 Console 에 이 파일 전체를 붙여넣고 Enter.
 * 3) 클립보드에 복사된 JSON 을 js/data.js 의 RIDI.BOOKS 자리에 붙여넣는다.
 *    (각 항목에 cover 가 들어가 있어 그대로 실제 표지가 표시된다.)
 */
(function () {
  var seen = {}, out = [];
  document.querySelectorAll('a[href*="/books/"]').forEach(function (a) {
    var m = a.getAttribute("href").match(/\/books\/(\d+)/); if (!m || seen[m[1]]) return;
    var img = a.querySelector("img"); if (!img) return;
    var src = img.currentSrc || img.src || ""; if (!src) return;
    var card = a.closest("li, article, div");
    var text = card ? card.innerText.split("\n").map(function (s) { return s.trim(); }).filter(Boolean) : [];
    var title = img.alt || text[0] || ""; var author = text.find(function (t) { return t !== title && !/[%원★]/.test(t) && t.length < 20; }) || "";
    var rating = parseFloat((text.find(function (t) { return /^\d\.\d/.test(t); }) || "4.5")) || 4.5;
    var price = parseInt((text.find(function (t) { return /원$/.test(t); }) || "10000").replace(/[^\d]/g, ""), 10) || 10000;
    var dc = parseInt((text.find(function (t) { return /%$/.test(t); }) || "0").replace(/[^\d]/g, ""), 10) || 0;
    seen[m[1]] = true;
    out.push({ id: out.length + 1, ridiId: m[1], title: title, author: author, rating: rating, count: Math.floor(Math.random() * 5000) + 100, price: price, org: dc ? Math.round(price / (1 - dc / 100) / 100) * 100 : price, dc: dc, tag: "", pal: out.length % 12, cover: src.replace(/\/(small|medium|large|xlarge)\b/, "/xxlarge") });
  });
  var json = "RIDI.BOOKS = " + JSON.stringify(out, null, 2) + ";";
  if (navigator.clipboard) navigator.clipboard.writeText(json).then(function () { console.log("복사 완료: " + out.length + "권"); });
  console.log(json);
  return out.length + "권 추출";
})();
