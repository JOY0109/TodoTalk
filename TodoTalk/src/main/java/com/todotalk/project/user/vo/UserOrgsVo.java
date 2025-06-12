package com.todotalk.project.user.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserOrgsVo {

	private String userORgId;		//ID(식별자)
	private String userId;          //사용자ID
	private String departmentId;    //부서ID
	private String teamId;          //팀ID\
	
	public UserOrgsVo(){
		this.userORgId = MakeUuid.generate();
	}
}
