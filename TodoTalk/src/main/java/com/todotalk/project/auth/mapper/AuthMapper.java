package com.todotalk.project.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.todotalk.project.user.vo.UsersVo;

@Mapper
public interface AuthMapper {
	
	int checkUser(@Param("userId") String userId, @Param("password") String password);

	void createAccount(@Param("user")UsersVo userVo);

}
