package com.todotalk.project.task.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/task")
public class TaskViewController {
	
	@GetMapping("/list")
    public String home() {
        return "list";  // list.html을 templates에서 찾아서 렌더링함
    }

}
