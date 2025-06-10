package com.todotalk.project.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectVo;

@Service
@Transactional
public class ProjectService {
	
	@Autowired
	ProjectMapper projectMappers;

	public List<ProjectVo> findProject() {
		List<ProjectVo> list = projectMappers.selectProject();
		return list;
	}

}
