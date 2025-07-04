package com.todotalk.project.project.vo;

import java.util.List;

import com.todotalk.project.user.vo.DepartmentsVo;
import com.todotalk.project.user.vo.TeamsVo;
import com.todotalk.project.user.vo.UserPayloadVo;
import com.todotalk.project.user.vo.UserProfilesVo;
import com.todotalk.project.user.vo.UsersVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectPayloadVo {
	private ProjectsVo project;
    private ProjectMembersVo member;
    private List<ProjectMembersVo> memberList;
    
    private UsersVo user;
   //private UserProfilesVo userPro;
	private DepartmentsVo department;
	private TeamsVo team;
}
