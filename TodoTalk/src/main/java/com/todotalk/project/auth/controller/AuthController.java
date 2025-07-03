package com.todotalk.project.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todotalk.project.auth.service.AuthService;
import com.todotalk.project.auth.vo.LoginResultVo;
import com.todotalk.project.user.vo.DepartmentsVo;
import com.todotalk.project.user.vo.TeamsVo;
import com.todotalk.project.user.vo.UserPayloadVo;

@Controller
public class AuthController {

	@Autowired
	AuthService authService;
	
	/**
	 * @설명:   계정생성
	 * @작성일: 2025. 6. 16.
	 * @return: void
	 */
	@PostMapping("/createAccount")
	@ResponseBody
	public ResponseEntity<Void> createAccount(@RequestBody UserPayloadVo userData) {
		if(userData == null) {
			return ResponseEntity.badRequest().build();  // 400 Bad Request
		}
		authService.createAccount(userData);
		return ResponseEntity.ok().build();              // 200 OK
	}
	
	/**
	 * @설명:   부서조회
	 * @작성일: 2025. 6. 24.
	 * @return: List<UserPayloadVo>
	 */
	@GetMapping("/selectDep")
	@ResponseBody
	public List<DepartmentsVo> selectDep(){
		return authService.selectDep();
	}
	
	/**
	 * @설명:   부서에 따른 팀명 조회
	 * @작성일: 2025. 6. 24.
	 * @return: List<TeamsVo>
	 */
	@GetMapping("/selectTeam")
	@ResponseBody
	public List<TeamsVo> selectTeam(@RequestParam String departmentId){
		return authService.selectTeam(departmentId);
	}

}
