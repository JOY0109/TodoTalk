package com.todotalk.project.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.todotalk.project.project.service.ProjectService;
import com.todotalk.project.project.vo.ProjectMembersVo;
import com.todotalk.project.project.vo.ProjectPayloadVo;
import com.todotalk.project.project.vo.ProjectsVo;
import com.todotalk.project.user.vo.UserPayloadVo;

@RestController
@RequestMapping("/loadProjectData")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	/**
	 * @설명:   프로젝트 목록
	 * @작성일: 2025. 6. 17.
	 */
	@GetMapping("/list")
	public List<ProjectsVo> project() {
		return projectService.findProject();
	}
	
	/**
	 * @설명:   프로젝트 등록
	 * @작성일: 2025. 6. 17.
	 */
	@PostMapping("/createProject")
	@ResponseBody
	public ResponseEntity<Void> createProject(@RequestBody(required = false) ProjectPayloadVo prj) {
	    if (prj == null) {
	        return ResponseEntity.badRequest().build();  // 400 Bad Request
	    }
	    projectService.createProject(prj);
	    return ResponseEntity.ok().build();              // 200 OK
	}
	
	/**
	 * @설명:   프로젝트 참여자 조회
	 * @작성일: 2025. 7. 1.
	 * @return: List<UserPayloadVo>
	 */
	@GetMapping("/findMembers")
	@ResponseBody
	public List<UserPayloadVo> findMembers(){
		return projectService.findMembers();
	}
	
	/**
	 * @설명:   프로젝트 상세 데이터 조회
	 * @작성일: 2025. 7. 3.
	 * @return: List<ProjectPayloadVo>
	 */
	@GetMapping("/projectDetail/{id}")
	@ResponseBody
	public List<ProjectPayloadVo> projectDetail(@PathVariable("id") String id){
		return projectService.projectDetail(id);
	}
	
	/**
	 * @설명:   프로젝트 삭제
	 * @작성일: 2025. 7. 4.
	 * @return: List<ProjectPayloadVo>
	 */
	@DeleteMapping("/deleteProject/{id}")
	@ResponseBody
	public ResponseEntity<Void> deleteProject(@PathVariable("id") String id) {
	    if (id == null || id.trim().isEmpty()) {
	        return ResponseEntity.badRequest().build();  // 400 Bad Request
	    }
	    try {
	        projectService.deleteProject(id);
	        return ResponseEntity.ok().build();          // 200 OK
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().build(); // 500
	    }
	}


}
