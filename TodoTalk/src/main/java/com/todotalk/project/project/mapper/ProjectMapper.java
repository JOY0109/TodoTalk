package com.todotalk.project.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.todotalk.project.project.vo.ProjectMembersVo;
import com.todotalk.project.project.vo.ProjectPayloadVo;
import com.todotalk.project.project.vo.ProjectsVo;

@Mapper
public interface ProjectMapper {

	List<ProjectsVo> selectProject();

	void createProject(@Param("prjVo") ProjectsVo prjVo);

	void addProjectMember(@Param("prjMem") ProjectMembersVo prjMem);


}
