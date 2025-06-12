package com.todotalk.project.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AuthMapper {

	
	int checkUser(@Param("userId") String userId, @Param("password") String password);

}
