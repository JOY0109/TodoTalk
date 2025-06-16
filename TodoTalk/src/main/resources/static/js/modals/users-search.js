"use strict";

var KTModalUserSearch = (function () {
  var e, t, n, s, a;

  var r = function (searchInstance) {
    setTimeout(function () {
      var random = KTUtil.getRandomInt(1, 3);

      t.classList.add("d-none");

      if (random === 3) {
        n.classList.add("d-none");
        s.classList.remove("d-none");
      } else {
        n.classList.remove("d-none");
        s.classList.add("d-none");
      }

      searchInstance.complete();
    }, 1500);
  };

  var o = function () {
    t.classList.remove("d-none");
    n.classList.add("d-none");
    s.classList.add("d-none");
  };

  return {
    init: function () {
      e = document.querySelector("#kt_modal_users_search_handler");

      if (!e) return;

      e.querySelector('[data-kt-search-element="wrapper"]');
      t = e.querySelector('[data-kt-search-element="suggestions"]');
      n = e.querySelector('[data-kt-search-element="results"]');
      s = e.querySelector('[data-kt-search-element="empty"]');

      a = new KTSearch(e);
      a.on("kt.search.process", r);
      a.on("kt.search.clear", o);
    }
  };
})();

KTUtil.onDOMContentLoaded(function () {
  KTModalUserSearch.init();
});
