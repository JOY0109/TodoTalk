package com.todotalk.project.user.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TeamsVo {

	private String teamId;			//ID(식별자)	
	private String departmentId;    //소속부서
	private String teamCode;        //팀코드
	private String teamName;        //팀명
	private String teamDescription; //팀 비고
}
