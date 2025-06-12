package com.todotalk.project.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.todotalk.project.project.vo.ProjectsVo;

@Mapper
public interface ProjectMapper {

	List<ProjectsVo> selectProject();

}
