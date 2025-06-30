package com.todotalk.project.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthViewController {

	/**
	 * @설명:   로그인 화면
	 * @작성일: 2025. 6. 16.
	 * @return: String
	 */
	@GetMapping("/")
    public String signIn() {
        return "auth/sign-in";
    }
	
	/**
	 * @설명:   계정생성 화면
	 * @작성일: 2025. 6. 16.
	 * @return: String
	 */
	@GetMapping("/signUp")
	public String signUp() {
		return "auth/sign-up";
	}
	
}
