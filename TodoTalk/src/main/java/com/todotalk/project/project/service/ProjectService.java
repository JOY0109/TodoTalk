package com.todotalk.project.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todotalk.project.project.mapper.ProjectMapper;
import com.todotalk.project.project.vo.ProjectsVo;

@Service
@Transactional
public class ProjectService {
	
	@Autowired
	ProjectMapper projectMappers;

	public List<ProjectsVo> findProject() {
		List<ProjectsVo> list = projectMappers.selectProject();
		return list;
	}

}
