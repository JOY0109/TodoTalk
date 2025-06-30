"use strict";

const KTModalCreateProjectSettings = (() => {
    let nextBtn, prevBtn, validator, formElement, stepperObj;

    return {
        init: () => {
            formElement = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();

            const stepper = KTModalCreateProject.getStepper();
            nextBtn = stepper.querySelector('[data-kt-element="settings-next"]');
            prevBtn = stepper.querySelector('[data-kt-element="settings-previous"]');

            // Dropzone 설정
            new Dropzone("#kt_modal_create_project_settings_logo", {
                url: "https://keenthemes.com/scripts/void.php",
                paramName: "file",
                maxFiles: 10,
                maxFilesize: 10, // MB
                addRemoveLinks: true,
                accept: (file, done) => {
                    if (file.name === "justinbieber.jpg") {
                        done("Naha, you don't.");
                    } else {
                        done();
                    }
                }
            });

            // flatpickr 설정
            $(formElement.querySelector('[name="settings_release_date"]')).flatpickr({
                enableTime: true,
                dateFormat: "d, M Y, H:i"
            });

            // select 박스 변경 시 유효성 재검사
            $(formElement.querySelector('[name="settings_customer"]')).on("change", () => {
                validator.revalidateField("settings_customer");
            });

            // 유효성 검사 설정
            validator = FormValidation.formValidation(formElement, {
                fields: {
                    settings_name: {
                        validators: {
                            notEmpty: {
                                message: "Project name is required"
                            }
                        }
                    },
                    settings_customer: {
                        validators: {
                            notEmpty: {
                                message: "Customer is required"
                            }
                        }
                    },
                    settings_description: {
                        validators: {
                            notEmpty: {
                                message: "Description is required"
                            }
                        }
                    },
                    settings_release_date: {
                        validators: {
                            notEmpty: {
                                message: "Release date is required"
                            }
                        }
                    },
                    "settings_notifications[]": {
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
    window.KTModalCreateProjectSettings = module.exports = KTModalCreateProjectSettings;
}
