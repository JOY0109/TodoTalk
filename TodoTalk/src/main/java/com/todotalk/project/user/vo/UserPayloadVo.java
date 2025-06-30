package com.todotalk.project.user.vo;

import com.todotalk.project.project.vo.ProjectMembersVo;
import com.todotalk.project.project.vo.ProjectsVo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserPayloadVo {
	private UsersVo user;
	private UserOrgsVo userOrg;
	private UserProfilesVo userPro;
	private DepartmentsVo department;
	private TeamsVo team;
}
