"use strict";

var KTSigninGeneral = (function() {
  var formEl, submitBtn, validation;

  return {
    init: function() {
      formEl = document.querySelector("#kt_sign_in_form");
      submitBtn = document.querySelector("#kt_sign_in_submit");
      validation = FormValidation.formValidation(formEl, {
        fields: {
          userId: {
            validators: {
              notEmpty: {
                message: "아이디를 입력해 주세요"
              },
			  regexp: {
		        regexp: /^\S+$/,  // "공백이 하나도 없어야 한다"는 의미
		        message: '공백이있습니다.'
		      }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: "비밀번호를 입력해 주세요"
              },
			  regexp: {
	  	        regexp: /^\S+$/,  // "공백이 하나도 없어야 한다"는 의미
	  	        message: '비밀번호에 공백이 포함되어있습니다.'
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

	  submitBtn.addEventListener("click", function(e) {
	    e.preventDefault();

	    validation.validate().then(function(status) {
	      if (status === "Valid") {
	        const userId = formEl.querySelector('[name="userId"]').value;
	        const password = formEl.querySelector('[name="password"]').value;

			//ajax 
	        fetch('/checkUser', {
	          method: 'POST',
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          body: `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
	        })
	        .then(response => response.json())
	        .then(data => {
	          if (data.success) {
	            // 로그인 성공 (원하는대로 이동)
	            window.location.href = '/project/list'; // 필요에 따라 경로 조정
	          } else {
	            // 실패시 Swal로 안내!
	            Swal.fire({
	              text: data.message,
	              icon: "error",
	              buttonsStyling: false,
	              confirmButtonText: "확인",
	              customClass: {
	                confirmButton: "btn btn-primary"
	              }
	            });
	          }
	        })
	        .catch(() => {
	          Swal.fire({
	            text: "서버 오류가 발생했습니다.",
	            icon: "error",
	            buttonsStyling: false,
	            confirmButtonText: "확인",
	            customClass: {
	              confirmButton: "btn btn-primary"
	            }
	          });
	        });
	      } else {
	        // 유효성 불통과시
	        Swal.fire({
	          text: "입력 값을 확인하세요.",
	          icon: "warning",
	          buttonsStyling: false,
	          confirmButtonText: "확인",
	          customClass: {
	            confirmButton: "btn btn-primary"
	          }
	        });
	      }
	    });
	  });
    }
  };
})();

KTUtil.onDOMContentLoaded(function() {
  KTSigninGeneral.init();
});
