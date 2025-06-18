"use strict";

var KTModalNewTarget = (function () {
  var t, e, n, a, o, i;

  return {
    init: function () {
      i = document.querySelector("#kt_modal_new_target");

      if (!i) return;

      o = new bootstrap.Modal(i);
      a = document.querySelector("#kt_modal_new_target_form");
      t = document.getElementById("kt_modal_new_target_submit");
      e = document.getElementById("kt_modal_new_target_cancel");

      $(a.querySelector('[name="start_date"]')).flatpickr({
			enableTime: true,
			time_24hr: true,
			dateFormat: "Y-m-d H:i:S",  // ← MySQL DATETIME 형식
			altInput: true,
			altFormat: "Y-m-d H:i",     // 사용자에게 보이는 형식
			locale: "ko"         
      });
      $(a.querySelector('[name="end_date"]')).flatpickr({
			enableTime: true,
			time_24hr: true,
			dateFormat: "Y-m-d H:i:S",
			altInput: true,
			altFormat: "Y-m-d H:i",
			locale: "ko"         
      });

      $(a.querySelector('[name="team_assign"]')).on("change", function () {
        n.revalidateField("team_assign");
      });

      n = FormValidation.formValidation(a, {
        fields: {
          target_title: {
            validators: {
              notEmpty: {
                message: "필수입력"
              }
            }
          },
          start_date: {
            validators: {
              notEmpty: {
                message: "필수입력"
              }
            }
          },
          end_date: {
            validators: {
              notEmpty: {
                message: "필수입력"
              }
            }
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: ""
          })
        }
      });

      t.addEventListener("click", function (e) {
        e.preventDefault();

        if (!n) return;

        n.validate().then(function (result) {
          console.log("validated!");
		  if (result === "Valid") {

		    /* ---------- ① 폼 값 꺼내기 ---------- */
		    const title      = a.querySelector('[name="target_title"]').value.trim();
		    const status   = a.querySelector('[name="status"]').value;
		    const startDate = a.querySelector('[name="start_date"]').value; 
		    const endDate = a.querySelector('[name="end_date"]').value;

			const startDateISO = startDate ? dayjs(startDate, "YYYY-MM-DD HH:mm").toISOString() : null;
			const endDateISO = endDate ? dayjs(endDate, "YYYY-MM-DD HH:mm").toISOString() : null;


		    /* ---------- ② ProjectPayloadVo 형태로 조립 ---------- */
		    const payload = {
		      project: {
		        projectName      : title,
		        projectStatus    : status,         // 기본 진행중
		        projectStartDate : startDateISO, // 오늘
		        projectEndDate   : endDateISO,
		        createdBy        : 'e5cc7cf1-7aaf-47ea-b91d-2d2bb56db2b4'
		      },
		      member: {
		      }
		    };

		    /* ---------- ③ 서버로 전송 ---------- */
		    t.setAttribute("data-kt-indicator", "on");
		    t.disabled = true;

		    fetch("/loadProjectData/createProject", {
		      method  : "POST",
		      headers : { "Content-Type": "application/json" },
		      body    : JSON.stringify(payload)
		    })
		    .then(res => {
		        if (!res.ok) throw new Error("fail");
		        return res;
		    })
		    .then(() => {
		        t.removeAttribute("data-kt-indicator");
		        t.disabled = false;

		        Swal.fire({
		          text: "프로젝트가 등록되었습니다!",
		          icon: "success",
		          buttonsStyling: false,
		          confirmButtonText: "확인",
		          customClass: { confirmButton: "btn btn-primary" }
		        }).then(() => {
		          o.hide();          // 모달 닫기
		          a.reset();         // 폼 초기화
				  location.reload(); 
		        });
		    })
		    .catch(() => {
		        t.removeAttribute("data-kt-indicator");
		        t.disabled = false;

		        Swal.fire({
		          text: "저장 중 오류가 발생했습니다. 다시 시도해주세요.",
		          icon: "error",
		          buttonsStyling: false,
		          confirmButtonText: "확인",
		          customClass: { confirmButton: "btn btn-primary" }
		        });
		    });
		    
		  }

        });
      });

      e.addEventListener("click", function (t) {
        t.preventDefault();
		a.reset();
		o.hide();
      });
    }
  };
})();

KTUtil.onDOMContentLoaded(function () {
  KTModalNewTarget.init();
});
