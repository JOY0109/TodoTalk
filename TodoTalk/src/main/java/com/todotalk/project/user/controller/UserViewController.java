package com.todotalk.project.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/user")
public class UserViewController {
	
	@GetMapping("/list")  // http://localhost:8080/ 으로 접속하면
    public String home() {
        return "user/home";  // home.html을 templates에서 찾아서 렌더링함
    }

}
