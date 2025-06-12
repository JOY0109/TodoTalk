package com.todotalk.project.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectsVo;
import com.todotalk.project.task.mapper.TasktMapper;

@Service
@Transactional
public class TaskService {
	
	@Autowired
	TasktMapper taskMapper;

}
