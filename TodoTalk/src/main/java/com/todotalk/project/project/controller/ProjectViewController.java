package com.todotalk.project.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/project")
public class ProjectViewController {
	
	@GetMapping("/list")  // http://localhost:8080/ 으로 접속하면
    public String home() {
        return "project/project-view";  // home.html을 templates에서 찾아서 렌더링함
    }

}
