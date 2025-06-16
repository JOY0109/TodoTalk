"use strict";

var KTModalUpgradePlan = (function () {
  var t, n, a;

  var e = function (mode) {
    [].slice.call(t.querySelectorAll("[data-kt-plan-price-month]")).map(function (el) {
      var monthly = el.getAttribute("data-kt-plan-price-month");
      var annual = el.getAttribute("data-kt-plan-price-annual");

      if (mode === "month") {
        el.innerHTML = monthly;
      } else if (mode === "annual") {
        el.innerHTML = annual;
      }
    });
  };

  return {
    init: function () {
      t = document.querySelector("#kt_modal_upgrade_plan");

      if (!t) return;

      n = t.querySelector('[data-kt-plan="month"]');
      a = t.querySelector('[data-kt-plan="annual"]');

      n.addEventListener("click", function () {
        e("month");
      });

      a.addEventListener("click", function () {
        e("annual");
      });

      KTUtil.on(t, '[data-bs-toggle="tab"]', "click", function () {
        this.querySelector('[type="radio"]').checked = !0;
      });
    }
  };
})();

KTUtil.onDOMContentLoaded(function () {
  KTModalUpgradePlan.init();
});
