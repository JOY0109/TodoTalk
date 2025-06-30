"use strict";

const KTModalCreateProjectTeam = (() => {
    let nextBtn, prevBtn, stepperObj;

    return {
        init: () => {
            const form = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();

            const stepper = KTModalCreateProject.getStepper();
            nextBtn = stepper.querySelector('[data-kt-element="team-next"]');
            prevBtn = stepper.querySelector('[data-kt-element="team-previous"]');

            // 다음 버튼 클릭 이벤트
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();

                nextBtn.disabled = true;
                nextBtn.setAttribute("data-kt-indicator", "on");

                setTimeout(() => {
                    nextBtn.disabled = false;
                    nextBtn.removeAttribute("data-kt-indicator");
                    stepperObj.goNext();
                }, 1500);
            });

            // 이전 버튼 클릭 이벤트
            prevBtn.addEventListener("click", () => {
                stepperObj.goPrevious();
            });
        }
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectTeam = module.exports = KTModalCreateProjectTeam;
}
