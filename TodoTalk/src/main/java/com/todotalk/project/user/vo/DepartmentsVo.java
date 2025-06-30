package com.todotalk.project.user.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DepartmentsVo {

	private String departmentId;			//ID(식별자)
	private String departmentCode;          //부서코드
	private String departmentName;          //부서명
	private String departmentDescription;   //부서비고

}
