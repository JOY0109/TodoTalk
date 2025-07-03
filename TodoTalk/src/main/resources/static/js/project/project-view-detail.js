"use strict";

// 프로젝트 상세 뷰 모듈
const ProjectViewDetail = (() => {
	  // ✅ 데이터 초기화
	  const initData = async () => {
		console.log('start');
	    try {
			const params = new URLSearchParams(window.location.search);
		    const projectId = params.get('projectId');
		    if (!projectId) throw new Error("projectId 없음");
		    const res = await fetch(`/loadProjectData/projectDetail/${projectId}`);
		    const data = await res.json();
			console.log('프로젝트 상세:', data);
	    } catch (err) {
	      console.error('데이터 로딩 오류:', err);
	    }
	  };
	
	  //이벤트 바인딩
	  const initEvent = () => {
	  };
	
	  //화면 렌더링
	  const render = () => {
	  };
	
	  const init = () => {
	    initData();
	    initEvent();
	    render();
	  };
	
	  // 🔓 외부에 공개
	  return { init };
})();

// DOM 로딩 후 실행
KTUtil.onDOMContentLoaded(() => {
  ProjectViewDetail.init();
});
