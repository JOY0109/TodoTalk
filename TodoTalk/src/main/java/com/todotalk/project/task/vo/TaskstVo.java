package com.todotalk.project.task.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskstVo {
	
	private String taskId;				//ID(식별자)
	private String projectId;           //프로젝트ID
	private String departmentId;        //담당부서ID
	private String teamId;              //담당팀ID
	private String taskName;            //업무명
	private String taskDescription;     //업무설명
	private String taskStatus;          //업무상태(01: 할당, 02: 진행중, 03: 검토중, 04: 완료, 05: 보류, 06: 상시)
	private String taskType;            //업무 종류(부서별 업무/ 회의 / 요청 / 이슈 / 프로젝트)
	private String priority;            //업무우선순위(상/중/하)
	private LocalDateTime createdAt;    //등록일
	private LocalDateTime dueDate;      //업무 마감일
	
	public TaskstVo() {
		this.taskId = MakeUuid.generate();
	}
}
