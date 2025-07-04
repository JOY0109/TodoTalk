"use strict";
let projectId;

const ProjectViewDetail = (() => {
  const initData = async () => {

    try {
      const params = new URLSearchParams(window.location.search);
      projectId = params.get('projectId');
      if (!projectId) throw new Error("projectId 없음");

      const res = await fetch(`/loadProjectData/projectDetail/${projectId}`);
      const data = await res.json();

	  console.log(data);
      if (!Array.isArray(data) || data.length === 0) return;

      const project = data[0].project;
      const projectName = project.projectName;
      const projectStatus = project.projectStatus;

      // 프로젝트명
      document.querySelector('#project-name').textContent = projectName;

      // 상태
	  /*	  "01": "진행중",
	       "02": "완료",
	       "03": "지연",
	       "04": "보류",
	       "05": "상시" */
      let statusText = '기타';
      if (projectStatus === '01') statusText = '진행중';
      else if (projectStatus === '02') statusText = '완료';
      else if (projectStatus === '03') statusText = '지연';
      else if (projectStatus === '04') statusText = '보류';
      else if (projectStatus === '05') statusText = '상시';
      document.querySelector('#project-status').textContent = statusText;

      const participantBox = document.querySelector('#project-participants');
      const dueDate = document.querySelector('#due-date');
      const createdByName = document.querySelector('#createdByName');
      participantBox.innerHTML = ''; // 초기화
	  
	  data.forEach(item => {
		const actionBox = document.querySelector('#project-actions');
		// 작성자만 수정/삭제 버튼 보이기
		if (project.createdBy === sessionData.userId) {
		  actionBox.style.setProperty("display", "flex", "important");
		} else {
		  actionBox.style.setProperty("display", "none", "important");
		}

		const projectEndDate = item.project.projectEndDate
		const createdName = item.user.createdByName
		const name = item.user?.realName || '참여자 없음';
		const div = document.createElement('div');
		
		dueDate.textContent = dayjs(projectEndDate).format(`YYYY년 MM월 DD일`);
		createdByName.textContent = '작성자: '+createdName
		//참여자
		div.textContent = name;
		participantBox.appendChild(div);
		
	  });

    } catch (err) {
      console.error('데이터 로딩 오류:', err);
    }
  };

  const initEvent = () => { 
    const deleteBtn = document.querySelector('#btn-delete-project');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        if (!projectId) return alert("projectId 없음");

        const confirmed = confirm("정말로 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
          const res = await fetch(`/loadProjectData/deleteProject/${projectId}`, {
            method: 'DELETE'
          });

          if (!res.ok) throw new Error("서버 오류");

          // JSON 파싱 제거
          // const result = await res.json(); ❌

          alert('삭제 요청이 완료되었습니다.');
          location.href = '/project/list';
        } catch (err) {
          console.error('삭제 요청 실패:', err);
          alert('삭제 중 오류가 발생했습니다.');
        }
      });
    }
  };


  const render = () => {};

  const init = () => {
    initData();
    initEvent();
    render();
  };

  return { init };
})();

KTUtil.onDOMContentLoaded(async () => {
	try {
	    const sessionRes = await fetch('/sessionUser');
	    sessionData = await sessionRes.json();
	  } catch (err) {
	    console.warn("세션 정보 불러오기 실패", err);
	  }
  	ProjectViewDetail.init();
});
