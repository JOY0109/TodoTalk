package com.todotalk.project.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.todotalk.project.TodoTalkApplication;
import com.todotalk.project.auth.mapper.AuthMapper;
import com.todotalk.project.user.vo.UsersVo;

@Service
@Transactional
public class AuthService {

    private final TodoTalkApplication todoTalkApplication;
	
	@Autowired
	AuthMapper authMapper;

    AuthService(TodoTalkApplication todoTalkApplication) {
        this.todoTalkApplication = todoTalkApplication;
    }
	
	public int checkUser(String userId, String password) {
		return authMapper.checkUser(userId,password);
	}
	
	public void createAccount(UsersVo userVo) {
		authMapper.createAccount(userVo);
	}

}
