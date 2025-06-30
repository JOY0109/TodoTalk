"use strict";

const KTModalCreateProjectFiles = (() => {
    let nextBtn, prevBtn, stepperObj;

    return {
        init: () => {
            const form = KTModalCreateProject.getForm();
            stepperObj = KTModalCreateProject.getStepperObj();
            const stepper = KTModalCreateProject.getStepper();

            nextBtn = stepper.querySelector('[data-kt-element="files-next"]');
            prevBtn = stepper.querySelector('[data-kt-element="files-previous"]');

            // Dropzone 초기화
            new Dropzone("#kt_modal_create_project_files_upload", {
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

            // 다음 버튼 클릭
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();

                nextBtn.disabled = true;
                nextBtn.setAttribute("data-kt-indicator", "on");

                setTimeout(() => {
                    nextBtn.removeAttribute("data-kt-indicator");
                    nextBtn.disabled = false;
                    stepperObj.goNext();
                }, 1500);
            });

            // 이전 버튼 클릭
            prevBtn.addEventListener("click", () => {
                stepperObj.goPrevious();
            });
        }
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    window.KTModalCreateProjectFiles = module.exports = KTModalCreateProjectFiles;
}
