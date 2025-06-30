"use strict";

const KTModalCreateProjectType = (() => {
    let nextBtn, validator, formElement, stepperObj;

    return {
        init: () => {
            formElement = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();

            const stepper = KTModalCreateProject.getStepper();
            nextBtn = stepper.querySelector('[data-kt-element="type-next"]');

            // FormValidation 설정
            validator = FormValidation.formValidation(formElement, {
                fields: {
                    project_type: {
                        validators: {
                            notEmpty: {
                                message: "Project type is required"
                            }
                        }
                    }
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

            // 다음 버튼 클릭 이벤트
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                nextBtn.disabled = true;

                if (!validator) return;

                validator.validate().then((status) => {
                    console.log("validated!");

                    if (status === "Valid") {
                        nextBtn.setAttribute("data-kt-indicator", "on");

                        setTimeout(() => {
                            nextBtn.removeAttribute("data-kt-indicator");
                            nextBtn.disabled = false;
                            stepperObj.goNext();
                        }, 1000);
                    } else {
                        nextBtn.disabled = false;
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
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

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectType = module.exports = KTModalCreateProjectType;
}
