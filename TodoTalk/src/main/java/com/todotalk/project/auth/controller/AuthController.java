package com.todotalk.project.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todotalk.project.auth.service.AuthService;
import com.todotalk.project.auth.vo.LoginResultVo;
import com.todotalk.project.user.vo.UsersVo;

@Controller
public class AuthController {
	
	@Autowired
	AuthService authService;
	
	@GetMapping("/")
    public String signIn() {
        return "auth/sign-in";
    }
	
	@GetMapping("/signUp")
	public String signUp() {
		return "auth/sign-up";
	}
	
	@PostMapping("/checkUser")
	@ResponseBody
	public LoginResultVo checkUser(@RequestParam String userId, @RequestParam String password) {
	    int checkUser = authService.checkUser(userId, password);
	    if (checkUser == 1) {
	        return new LoginResultVo(true, "로그인 성공!");
	    } else {
	        return new LoginResultVo(false, "아이디 또는 비밀번호가 일치하지 않습니다.");
	    }
	}
	
	@PostMapping("/createAccount")
	@ResponseBody
	public void createAccount(@RequestBody UsersVo userVo) {
		authService.createAccount(userVo);
	}


}
