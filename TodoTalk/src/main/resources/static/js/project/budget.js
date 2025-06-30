"use strict";

const KTModalCreateProjectBudget = (() => {
    let nextBtn, prevBtn, validationInstance, formElement, stepperObj;

    return {
        init: () => {
            formElement = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();
            nextBtn = KTModalCreateProject.getStepper().querySelector('[data-kt-element="budget-next"]');
            prevBtn = KTModalCreateProject.getStepper().querySelector('[data-kt-element="budget-previous"]');

            validationInstance = FormValidation.formValidation(formElement, {
                fields: {
                    budget_setup: {
                        validators: {
                            notEmpty: {
                                message: "Budget amount is required"
                            },
                            callback: {
                                message: "The budget amount must be greater than $100",
                                callback: ({ value }) => {
                                    const numeric = parseFloat(value.replace(/[$,]+/g, ""));
                                    return numeric >= 100;
                                }
                            }
                        }
                    },
                    budget_usage: {
                        validators: {
                            notEmpty: {
                                message: "Budget usage type is required"
                            }
                        }
                    },
                    budget_allow: {
                        validators: {
                            notEmpty: {
                                message: "Allowing budget is required"
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

            const dialer = KTDialer.getInstance(formElement.querySelector("#kt_modal_create_project_budget_setup"));
            dialer.on("kt.dialer.changed", () => {
                validationInstance.revalidateField("budget_setup");
            });

            nextBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                nextBtn.disabled = true;

                if (!validationInstance) return;

                const status = await validationInstance.validate();
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

            prevBtn.addEventListener("click", () => {
                stepperObj.goPrevious();
            });
        }
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectBudget = module.exports = KTModalCreateProjectBudget;
}
