package com.todotalk.project.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.auth.mapper.AuthMapper;

@Service
@Transactional
public class AuthService {
	
	@Autowired
	AuthMapper authMapper;

	
	public int checkUser(String userId, String password) {
		return authMapper.checkUser(userId,password);
	}

}
