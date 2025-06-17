package com.todotalk.project.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.todotalk.project.TodoTalkApplication;
import com.todotalk.project.auth.mapper.AuthMapper;
import com.todotalk.project.common.utiles.MakeUuid;
import com.todotalk.project.user.vo.UsersVo;

@Service
@Transactional
public class AuthService {
	
	@Autowired
	AuthMapper authMapper;

	/**
	 * @설명:   로그인
	 * @작성일: 2025. 6. 16.
	 * @return: int : users 테이블
	 */
	public int checkUser(String userId, String password) {
		return authMapper.checkUser(userId,password);
	}
	
	/**
	 * @설명:   계정생성
	 * @작성일: 2025. 6. 16.
	 */
	public void createAccount(UsersVo userVo) {
		userVo.setUserId(MakeUuid.generateNoDash());
		System.out.println(userVo.toString());
		authMapper.createAccount(userVo);
	}

}
