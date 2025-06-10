package com.todotalk.project.project.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectVo {
	
	private String projectId;					//ID(식별자)
	private String projectName;                 //프로젝트명
	private LocalDateTime projectStartDate;     //프로젝트 시작일자
	private LocalDateTime projectEndDate;       //프로젝트 종료일자
	private String projectStatus;               //프로젝트상태(01: 진행중, 02: 완료, 03: 지연, 04: 보류, 05:상시)
	private String createdBy;                   //최초등록자
	private LocalDateTime createdAt;            //최초등록일시
	private String updatedBy;                   //수정자
	private LocalDateTime updatedAt;            //수정일시
	
	public ProjectVo() {
        this.projectId = MakeUuid.generate(); // 하이픈 포함
        // 또는 this.userId = UuidUtil.generateNoDash(); // 하이픈 없이
    }

}
