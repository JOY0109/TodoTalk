package com.todotalk.project.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectsVo;
import com.todotalk.project.user.mapper.UserMapper;

@Service
@Transactional
public class UsertService {
	
	@Autowired
	UserMapper userMapper;



}
