package com.todotalk.project.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/project")
public class ProjectViewController {
	
	
	/**
	 * @설명:   홈이자 프로젝트 목록
	 * @작성일: 2025. 6. 17.
	 */
	@GetMapping("/list")
    public String home() {
        return "project/project-view";
    }
	
	/**
	 * @설명:   프로젝트 상세
	 * @작성일: 2025. 6. 17.
	 */
	@GetMapping("/detail")
	public String detail() {
		return "project/project-view-detail";
	}

}
