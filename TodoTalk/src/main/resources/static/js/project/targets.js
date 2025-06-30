"use strict";

const KTModalCreateProjectTargets = (() => {
    let nextBtn, prevBtn, validator, formElement, stepperObj;

    return {
        init: () => {
            formElement = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();

            const stepper = KTModalCreateProject.getStepper();
            nextBtn = stepper.querySelector('[data-kt-element="targets-next"]');
            prevBtn = stepper.querySelector('[data-kt-element="targets-previous"]');

            // Tagify 설정
            const tagInput = formElement.querySelector('[name="target_tags"]');
            new Tagify(tagInput, {
                whitelist: ["Important", "Urgent", "High", "Medium", "Low"],
                maxTags: 5,
                dropdown: {
                    maxItems: 10,
                    enabled: 0,
                    closeOnSelect: false
                }
            }).on("change", () => {
                validator.revalidateField("target_tags");
            });

            // flatpickr 설정
            $(formElement.querySelector('[name="target_due_date"]')).flatpickr({
                enableTime: true,
                dateFormat: "d, M Y, H:i"
            });

            // selectbox 유효성 재검사
            $(formElement.querySelector('[name="target_assign"]')).on("change", () => {
                validator.revalidateField("target_assign");
            });

            // FormValidation 설정
            validator = FormValidation.formValidation(formElement, {
                fields: {
                    target_title: {
                        validators: {
                            notEmpty: {
                                message: "Target title is required"
                            }
                        }
                    },
                    target_assign: {
                        validators: {
                            notEmpty: {
                                message: "Customer is required"
                            }
                        }
                    },
                    target_due_date: {
                        validators: {
                            notEmpty: {
                                message: "Due date is required"
                            }
                        }
                    },
                    target_tags: {
                        validators: {
                            notEmpty: {
                                message: "Target tags are required"
                            }
                        }
                    },
                    target_allow: {
                        validators: {
                            notEmpty: {
                                message: "Allowing target is required"
                            }
                        }
                    },
                    "target_notifications[]": {
                        validators: {
                            notEmpty: {
                                message: "Notifications are required"
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
                        }, 1500);
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

            // 이전 버튼 클릭 이벤트
            prevBtn.addEventListener("click", () => {
                stepperObj.goPrevious();
            });
        }
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectTargets = module.exports = KTModalCreateProjectTargets;
}
