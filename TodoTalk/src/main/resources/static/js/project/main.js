"use strict";

const KTModalCreateProject = (() => {
    let stepperElement, formElement, stepperObj;

    return {
        init: () => {
            stepperElement = document.querySelector("#kt_modal_create_project_stepper");
            formElement = document.querySelector("#kt_modal_create_project_form");
            stepperObj = new KTStepper(stepperElement);
        },
        getStepperObj: () => stepperObj,
        getStepper: () => stepperElement,
        getForm: () => formElement
    };
})();

// DOMContentLoaded 이벤트 핸들러 등록
KTUtil.onDOMContentLoaded(() => {
    const modal = document.querySelector("#kt_modal_create_project");

    if (modal) {
        KTModalCreateProject.init();
        KTModalCreateProjectType.init();
        KTModalCreateProjectBudget.init();
        KTModalCreateProjectSettings.init();
        KTModalCreateProjectTeam.init();
        KTModalCreateProjectTargets.init();
        KTModalCreateProjectFiles.init();
        KTModalCreateProjectComplete.init();
    }
});

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProject = module.exports = KTModalCreateProject;
}
