package com.todotalk.project.project.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.common.utiles.MakeUuid;
import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectMembersVo;
import com.todotalk.project.project.vo.ProjectPayloadVo;
import com.todotalk.project.project.vo.ProjectsVo;
import com.todotalk.project.user.vo.UserPayloadVo;

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
		ProjectsVo prjVo = prj.getProject();
		List<ProjectMembersVo> prjMemList = prj.getMemberList();
		String projectId = MakeUuid.generateNoDash();
		
		prjVo.setProjectId(projectId);
		projectMappers.createProject(prjVo);
		
		if (prjMemList != null && !prjMemList.isEmpty()) {//초기에 등록 안 할 수 있음
			for(ProjectMembersVo memList : prjMemList ) {
				memList.setProjectId(projectId);
				memList.setProjectMemberId(MakeUuid.generateNoDash());
				projectMappers.addProjectMember(memList);
			}
	    }

	}

	/**
	 * @설명:   프로젝트 참여자 조회
	 * @작성일: 2025. 7. 1.
	 * @return: List<UserPayloadVo>
	 */
	public List<UserPayloadVo> findMembers() {
		return projectMappers.findMembers();
	}

	/**
	 * @설명:   프로젝트 상세 데이터 조회
	 * @작성일: 2025. 7. 3.
	 * @return: List<ProjectPayloadVo>
	 */
	public List<ProjectPayloadVo> projectDetail(String id) {
		return projectMappers.projectDetail(id);
	}

	/**
	 * @설명:   프로젝트 삭제
	 * @작성일: 2025. 7. 4.
	 * @return: List<ProjectPayloadVo>
	 */
	public void deleteProject(String id) {
		projectMappers.deleteProjectMem(id);
		projectMappers.deleteProject(id);
	}

}
