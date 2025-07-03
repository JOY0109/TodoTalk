"use strict";
let sessionData = null;
let tagifyInstance = null; 

const KTModalNewTarget = (() => {
  let submitBtn, cancelBtn, validator, formEl, modalEl, modalInstance;

  // ✅ 참여자 목록 불러와서 Tagify 초기화
  const loadMembersToTagify = async () => {
    try {
      const res = await fetch('/loadProjectData/findMembers');
      const data = await res.json();
		console.log(data)
      const tagInput = formEl.querySelector('[name="tags"]');

      if (Array.isArray(data)) {
		const whitelist = data.map(member => {
		  const name = member.user?.realName || '이름없음';
		  const position = member.userPro?.position || '';
		  const empNo = member.user?.employeeNo || '';
		  const teamName = member.team?.teamName || '';
		  return {
		    value: `${name} ${position}(${empNo})/${teamName}`,
		    userId: member.user?.userId,
		    departmentId: member.department?.departmentId,
		    teamId: member.team?.teamId
		  };
		});

        tagifyInstance = new Tagify(tagInput, {
          whitelist: whitelist,
          maxTags: 5,
          dropdown: {
            maxItems: 10,
            enabled: 0,
            closeOnSelect: false
          }
        })
      } else {
        console.warn("참여자 응답이 배열이 아닙니다:", data);
      }
    } catch (err) {
      console.error("참여자 정보 불러오기 실패", err);
    }
  };

  return {
    init: async () => {
      modalEl = document.querySelector("#kt_modal_new_target");
      if (!modalEl) return;

      modalInstance = new bootstrap.Modal(modalEl);
      formEl = document.querySelector("#kt_modal_new_target_form");
      submitBtn = document.getElementById("kt_modal_new_target_submit");
      cancelBtn = document.getElementById("kt_modal_new_target_cancel");

      // 날짜 선택기
      $(formEl.querySelector('[name="start_date"]')).flatpickr({
        enableTime: true,
        time_24hr: true,
        dateFormat: "Y-m-d H:i:S",
        altInput: true,
        altFormat: "Y-m-d H:i",
        locale: "ko"
      });
      $(formEl.querySelector('[name="end_date"]')).flatpickr({
        enableTime: true,
        time_24hr: true,
        dateFormat: "Y-m-d H:i:S",
        altInput: true,
        altFormat: "Y-m-d H:i",
        locale: "ko"
      });

      // 팀 변경 시 유효성 재검사
      $(formEl.querySelector('[name="team_assign"]')).on("change", () => {
        validator.revalidateField("team_assign");
      });

      // 유효성 검증
      validator = FormValidation.formValidation(formEl, {
        fields: {
          target_title: { validators: { notEmpty: { message: "필수입력" } } },
          start_date: { validators: { notEmpty: { message: "필수입력" } } },
          end_date: { validators: { notEmpty: { message: "필수입력" } } },
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

      //참여자 태그 불러오기
      await loadMembersToTagify();

      // 제출 버튼
      submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!validator) return;

        const result = await validator.validate();
        if (result !== "Valid") return;

        const title = formEl.querySelector('[name="target_title"]').value.trim();
        const status = formEl.querySelector('[name="status"]').value;
        const startDate = formEl.querySelector('[name="start_date"]').value;
        const endDate = formEl.querySelector('[name="end_date"]').value;

        const startDateISO = startDate ? dayjs(startDate, "YYYY-MM-DD HH:mm").toISOString() : null;
        const endDateISO = endDate ? dayjs(endDate, "YYYY-MM-DD HH:mm").toISOString() : null;

		//태그에서 참여자 정보 추출
		const selectedMembers = tagifyInstance.value.map(tagData => ({
		  userId: tagData.userId,
		  departmentId: tagData.departmentId,
		  teamId: tagData.teamId,
		  endedAt : endDateISO
		}));
		
        const payload = {
          project: {
            projectName: title,
            projectStatus: status,
            projectStartDate: startDateISO,
            projectEndDate: endDateISO,
            createdBy: sessionData.userId
          },
          memberList: selectedMembers
        };

        submitBtn.setAttribute("data-kt-indicator", "on");
        submitBtn.disabled = true;

        try {
          const res = await fetch("/loadProjectData/createProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error("fail");

          Swal.fire({
            text: "프로젝트가 등록되었습니다!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "확인",
            customClass: { confirmButton: "btn btn-primary" }
          }).then(() => {
            modalInstance.hide();
            formEl.reset();
            location.reload();
          });
        } catch {
          Swal.fire({
            text: "저장 중 오류가 발생했습니다. 다시 시도해주세요.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "확인",
            customClass: { confirmButton: "btn btn-primary" }
          });
        } finally {
          submitBtn.removeAttribute("data-kt-indicator");
          submitBtn.disabled = false;
        }
      });

      // 취소 버튼
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formEl.reset();
        modalInstance.hide();
      });
    }
  };
})();

KTUtil.onDOMContentLoaded(async () => {
  try {
    const sessionRes = await fetch('/sessionUser');
    sessionData = await sessionRes.json();
  } catch (err) {
    console.warn("세션 정보 불러오기 실패", err);
  }

  // ✅ 모달 init 시작
  await KTModalNewTarget.init();
});
