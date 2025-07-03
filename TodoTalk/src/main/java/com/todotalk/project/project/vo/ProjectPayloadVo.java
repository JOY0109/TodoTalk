package com.todotalk.project.project.vo;

import java.util.List;

import com.todotalk.project.user.vo.UserPayloadVo;

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
    private UserPayloadVo userPayload; 
}
