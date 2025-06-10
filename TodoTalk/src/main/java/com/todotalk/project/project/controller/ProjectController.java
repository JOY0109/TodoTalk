package com.todotalk.project.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todotalk.project.project.service.ProjectService;
import com.todotalk.project.project.vo.ProjectVo;

@RestController
@RequestMapping("/project")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	@GetMapping("/list")
	public List<ProjectVo> project() {
		List<ProjectVo> list = projectService.findProject();
		System.out.println(list.toString());
		return list;
	}

}
