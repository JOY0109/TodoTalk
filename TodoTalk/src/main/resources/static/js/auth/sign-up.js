"use strict";

const KTSignupGeneral = (() => {
  let form, submitBtn;

  const isPasswordStrong = (pwMeter) => pwMeter.getScore() === 100;

  const handleSubmit = () => {
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const pwMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

      const validation = FormValidation.formValidation(form, {
        fields: {
          "name": { validators: { notEmpty: { message: "이름을 입력해 주세요" } } },
          "employeeNo": {
            validators: {
              notEmpty: { message: "사번을 입력해 주세요" },
              digits: { message: "숫자만 입력해 주세요" }
            }
          },
          "id": { validators: { notEmpty: { message: "아이디를 입력해 주세요" } } },
          "password": {
            validators: {
              notEmpty: { message: "비밀번호를 입력해 주세요" },
              callback: {
                message: "비밀번호가 충분히 강력하지 않습니다",
                callback: ({ value }) => value.length > 0 ? isPasswordStrong(pwMeter) : false
              }
            }
          },
          "confirm-password": {
            validators: {
              notEmpty: { message: "비밀번호 확인을 입력해 주세요" },
              identical: {
                compare: () => form.querySelector('[name="password"]').value,
                message: "비밀번호가 일치하지 않습니다"
              }
            }
          },
          toc: {
            validators: {
              notEmpty: { message: "약관에 동의해 주세요" }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger({ event: { password: false } }),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: ""
          })
        }
      });

      submitBtn.disabled = true;
      submitBtn.setAttribute("data-kt-indicator", "on");

      const status = await validation.validate();

      if (status === "Valid") {
        const userData = {
		  user: {
		    realName: form.querySelector('[name="name"]').value,
		    employeeNo: form.querySelector('[name="employeeNo"]').value,
		    authRole: form.querySelector('[name="authRole"]').value,
		    loginId: form.querySelector('[name="id"]').value,
		    loginPw: form.querySelector('[name="password"]').value,			
		  },
		  userOrg: {
			departmentId: form.querySelector('select[name="departments"]').value,
			teamId: form.querySelector('select[name="teams"]').value,
		  },
		  userPro: {
			position: form.querySelector('[name="position"]').value,
			officePhone: form.querySelector('[name="office_phone"]').value,
			mobilePhone: form.querySelector('[name="mobile_phone"]').value,
			address: form.querySelector('[name="address"]').value,
			gender: form.querySelector('[name="gender"]').value,
			birthDate: form.querySelector('[name="birth_date"]').value,
			hireDate: form.querySelector('[name="hire_date"]').value,
			status: "01",
		  },		
		  department: {},
		  team: {}
        };

        try {
          const response = await fetch('/createAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          });

          if (response.ok) {
            Swal.fire({
              text: "계정이 성공적으로 생성되었습니다.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "확인",
              customClass: { confirmButton: "btn btn-primary" }
            }).then(result => {
              if (result.isConfirmed) {
                form.reset();
                pwMeter.reset();
                window.location.href = '/';
              }
            });
          } else {
            const data = await response.json();
            Swal.fire({
              text: data.message || "계정 생성 중 오류가 발생했습니다.",
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

      submitBtn.disabled = false;
      submitBtn.removeAttribute("data-kt-indicator");
    });
  };

  const loadDepartmentsData = () => {
    fetch('/selectDep')
      .then(res => res.json())
      .then(data => {
        const select = document.querySelector('select[name="departments"]');
        select.innerHTML = '<option value="">부서 선택</option>';
        data.forEach(dep => {
          const option = document.createElement('option');
          option.value = dep.departmentId;
          option.textContent = dep.departmentName;
          select.appendChild(option);
        });
        select.addEventListener('change', (e) => {
          const departmentId = e.target.value;
          if (departmentId) loadTeamsData(departmentId);
        });
      });
  };

  const loadTeamsData = (departmentId) => {
    const select = document.querySelector('select[name="teams"]');
    select.innerHTML = '<option value="">팀 선택</option>';
    fetch(`/selectTeam?departmentId=${departmentId}`)
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          const option = document.createElement('option');
          option.value = item.team.teamId;
          option.textContent = item.team.teamName;
          select.appendChild(option);
        });
      });
  };

  return {
    init: () => {
      form = document.querySelector("#kt_sign_up_form");
      submitBtn = document.querySelector("#kt_sign_up_submit");

      if (!form || !submitBtn) {
        console.warn("form 또는 submitBtn을 찾지 못했습니다.");
        return;
      }

      handleSubmit();
      loadDepartmentsData();
    }
  };
})();

KTUtil.onDOMContentLoaded(() => {
  KTSignupGeneral.init();
});
