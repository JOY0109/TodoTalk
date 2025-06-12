package com.todotalk.project.task.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskAssignmentsVo {
	
	private String taskAssignmentId;	//ID(식별자)
	private String userId;              //담당자
	private String taskId;              //업무ID
	private String roles;               //역할
	private String createdBy;           //업무 최초 할당자
	private LocalDateTime createdAt;    //할당일
	private LocalDateTime updatedAt;    //수정일
	
	public TaskAssignmentsVo(){
		this.taskAssignmentId = MakeUuid.generate();
	}
}
