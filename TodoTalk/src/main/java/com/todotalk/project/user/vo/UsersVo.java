package com.todotalk.project.user.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UsersVo{
	
	private String userId;				//ID(식별자)
	private String loginId;             //로그인 ID
	private String loginPw;             //로그인 PW
	private String realName;            //이름
	private Integer employeeNo;         //사번
	private LocalDateTime loginTime;    //로그인시간
	private String authRole;            //권한
	
	public UsersVo(){
		this.userId = MakeUuid.generate();
	}

}
