"use strict";

const KTSignupGeneral = (() => {
    // 비밀번호 강도 체크 (100점일 때만 true)
    const isPasswordStrong = pwMeter => pwMeter.getScore() === 100;

    const init = () => {
        const form = document.querySelector("#kt_sign_up_form");
        const submitBtn = document.querySelector("#kt_sign_up_submit");
        // 💡 Password Meter 인스턴스 (변수명 pwMeter)
        const pwMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));
        const validation = FormValidation.formValidation(form, {
            fields: {
                "first-name": {
                    validators: {
                        notEmpty: { message: "First Name is required" }
                    }
                },
                "last-name": {
                    validators: {
                        notEmpty: { message: "Last Name is required" }
                    }
                },
                email: {
                    validators: {
                        notEmpty: { message: "Email address is required" },
                        emailAddress: { message: "The value is not a valid email address" }
                    }
                },
                password: {
                    validators: {
                        notEmpty: { message: "The password is required" },
                        callback: {
                            message: "Please enter valid password",
                            callback: ({ value }) => value.length > 0 ? isPasswordStrong(pwMeter) : false
                        }
                    }
                },
                "confirm-password": {
                    validators: {
                        notEmpty: { message: "The password confirmation is required" },
                        identical: {
                            compare: () => form.querySelector('[name="password"]').value,
                            message: "The password and its confirm are not the same"
                        }
                    }
                },
                toc: {
                    validators: {
                        notEmpty: { message: "You must accept the terms and conditions" }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger({
                    event: { password: false }
                }),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: ".fv-row",
                    eleInvalidClass: "",
                    eleValidClass: ""
                })
            }
        });

        submitBtn.addEventListener("click", async event => {
            event.preventDefault();
            submitBtn.disabled = true;
            submitBtn.setAttribute("data-kt-indicator", "on");

            const status = await validation.validate();
            if (status === "Valid") {
                // 값 수집
                const userData = {
                    userId: form.querySelector('[name="first-name"]').value,
                    loginId: form.querySelector('[name="last-name"]').value,
                    loginPw: form.querySelector('[name="email"]').value,
                    realName: form.querySelector('[name="password"]').value,
                };

                try {
                    const response = await fetch('/createAccount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
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
                        // 서버에서 실패 메시지 받을 때
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

        // 비밀번호 입력 시 검증 상태 초기화
        form.querySelector('input[name="password"]').addEventListener("input", function () {
            if (this.value.length > 0) validation.updateFieldStatus("password", "NotValidated");
        });
    };

    return { init };
})();

KTUtil.onDOMContentLoaded(() => {
    KTSignupGeneral.init();
});
