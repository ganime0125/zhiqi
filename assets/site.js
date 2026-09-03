// 站內腳本。**刻意抽成外部檔案** —— 內嵌 <script> 會逼 CSP 開 script-src 'unsafe-inline'，
// 那等於把 XSS 的主要防線關掉。放這裡就能維持 script-src 'self'（見 serve.py 的 CSP）。
(function () {
  var btn = document.getElementById("apk-btn");
  var toast = document.getElementById("apk-toast");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var href = btn.getAttribute("href");
    if (location.protocol === "file:") { toast.classList.add("show"); return; }
    fetch(href, { method: "HEAD" }).then(function (r) {
      if (!r.ok) toast.classList.add("show");
    }).catch(function () { toast.classList.add("show"); });
  });
})();
(function () {
  var root = document.querySelector("[data-rules]");
  if (!root) return;
  var tabs = root.querySelectorAll(".rule-tab");
  var panels = root.querySelectorAll(".rule-panel");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      var id = this.getAttribute("data-tab");
      for (var j = 0; j < tabs.length; j++) tabs[j].setAttribute("aria-selected", tabs[j] === this ? "true" : "false");
      for (var k = 0; k < panels.length; k++) panels[k].classList.toggle("active", panels[k].id === id);
    });
  }
})();
