package com.todotalk.project.project.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectPayloadVo {
	private ProjectsVo project;
    private ProjectMembersVo member;
}
