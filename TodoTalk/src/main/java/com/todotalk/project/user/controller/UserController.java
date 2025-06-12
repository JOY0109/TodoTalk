package com.todotalk.project.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todotalk.project.project.service.ProjectService;
import com.todotalk.project.project.vo.ProjectsVo;
import com.todotalk.project.user.service.UsertService;

@RestController
public class UserController {
	
	@Autowired
	UsertService userService;
	

}
