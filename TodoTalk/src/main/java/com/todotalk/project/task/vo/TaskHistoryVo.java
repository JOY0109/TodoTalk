package com.todotalk.project.task.vo;

import java.time.LocalDateTime;

import com.todotalk.project.common.utiles.MakeUuid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskHistoryVo {
	
	private String taskHistoryId;		//ID(식별자)
	private String taskId;              //업무ID
	private String userId;              //변경한 사용자
	private String changedField;        //변경항목
	private String oldValue;            //변경 전
	private String newValue;            //변경 후 
	private LocalDateTime changedTime;  //변경시간
	
	public TaskHistoryVo() {
		this.taskHistoryId = MakeUuid.generate();
	}
}
