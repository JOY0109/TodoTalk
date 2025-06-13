"use strict";

const KTSigninGeneral = (() => {
  const init = () => {
    const form = document.querySelector("#kt_sign_in_form");
    const submitBtn = document.querySelector("#kt_sign_in_submit");
    const validation = FormValidation.formValidation(form, {
      fields: {
        userId: {
          validators: {
            notEmpty: { message: "아이디를 입력해 주세요" },
            regexp: {
              regexp: /^\S+$/,
              message: "공백이있습니다."
            }
          }
        },
        password: {
          validators: {
            notEmpty: { message: "비밀번호를 입력해 주세요" },
            regexp: {
              regexp: /^\S+$/,
              message: "비밀번호에 공백이 포함되어있습니다."
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: ".fv-row"
        })
      }
    });

    submitBtn.addEventListener("click", async event => {
      event.preventDefault();

      // 버튼 비활성화 + 로딩 인디케이터 표시
      submitBtn.disabled = true;
      submitBtn.setAttribute("data-kt-indicator", "on"); // 커스텀 속성, 테마에서 자동으로 스피너 보여줄 수도 있음

      const status = await validation.validate();
      if (status === "Valid") {
        const userId = form.querySelector('[name="userId"]').value;
        const password = form.querySelector('[name="password"]').value;

        try {
          const response = await fetch('/checkUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
          });
          const data = await response.json();

          if (data.success) {
            window.location.href = '/project/list';
          } else {
            Swal.fire({
              text: data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "확인",
              customClass: { confirmButton: "btn btn-primary" }
            });
          }
        } catch {
          Swal.fire({
            text: "서버 오류가 발생했습니다.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "확인",
            customClass: { confirmButton: "btn btn-primary" }
          });
        }
      } else {
        Swal.fire({
          text: "입력 값을 확인하세요.",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "확인",
          customClass: { confirmButton: "btn btn-primary" }
        });
      }

      // 버튼 재활성화 + 로딩 인디케이터 해제
      submitBtn.disabled = false;
      submitBtn.removeAttribute("data-kt-indicator");
    });
  };

  return { init };
})();

KTUtil.onDOMContentLoaded(() => {
  KTSigninGeneral.init();
});
