"use strict";

const KTModalCreateProjectComplete = (() => {
    let stepperObj;

    return {
        init: () => {
            const form = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();

            const startBtn = KTModalCreateProject
                .getStepper()
                .querySelector('[data-kt-element="complete-start"]');

            startBtn.addEventListener("click", () => {
                stepperObj.goTo(1);
            });
        }
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectComplete = module.exports = KTModalCreateProjectComplete;
}
