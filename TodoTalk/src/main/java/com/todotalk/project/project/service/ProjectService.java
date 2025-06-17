package com.todotalk.project.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.common.utiles.MakeUuid;
import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectMembersVo;
import com.todotalk.project.project.vo.ProjectPayloadVo;
import com.todotalk.project.project.vo.ProjectsVo;

@Service
@Transactional
public class ProjectService {
	
	@Autowired
	ProjectMapper projectMappers;

	/**
	 * @설명:   프로젝트 목록
	 * @작성일: 2025. 6. 17.
	 * @return: List<ProjectsVo> : USERS테이블에서 작성자 명 외 전부 PROJECTS 테이블
	 */
	public List<ProjectsVo> findProject() {
		List<ProjectsVo> list = projectMappers.selectProject();
		return list;
	}

	/**
	 * @설명:   프로젝트 등록
	 * @작성일: 2025. 6. 17.
	 */
	public void createProject(ProjectPayloadVo prj) {
		ProjectsVo prjVo		= prj.getProject();
		ProjectMembersVo prjMem = prj.getMember();
		String projectId = MakeUuid.generateNoDash();
		String projectMemberId = MakeUuid.generateNoDash();
		
		prjVo.setProjectId(projectId);
		projectMappers.createProject(prjVo);
		
		if (prjMem != null) {//초기에 등록 안 할 수 있음
	        prjMem.setProjectId(projectId);
	        prjMem.setProjectMemberId(projectMemberId);
	        projectMappers.addProjectMember(prjMem);
	    }

	}

}
