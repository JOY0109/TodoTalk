package com.todotalk.project.user.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserProfilesVo {

	private String userProfilesId;			//ID(식별자)
	private String userId;                  //사용자ID
	private String position;                //직급
	private String officePhone;             //유선번호
	private String mobilePhone;             //휴대전화번호
	private String address;                 //주소
	private String gender;                  //성별(F/M)
	private Integer birthDate;              //생년월일
	private Integer hireDate;               //입사일
	private String status;                  //상태(01 : 재직/ 02 : 출산휴가 / 03 : 퇴사 / 04 : 병가 / 05 : 기타)
	private LocalDateTime statusUpdateDate; //상태변경일자

}
