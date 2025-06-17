package com.todotalk.project.project.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectMembersVo {
	
	private String projectMemberId;		//ID(식별자)
	private String projectId;           //프로젝트ID
	private String userId;              //사용자ID
	private String departmentId;        //부서ID
	private String teamId;              //팀ID
	private String isPm;                //PM여부 ： Y/N
	private LocalDateTime joinedAt;     //프로젝트 참여 일
	private LocalDateTime endedAt;      //프로젝트 참여 만료일
	
}
