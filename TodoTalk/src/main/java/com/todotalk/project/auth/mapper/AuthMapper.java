package com.todotalk.project.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.todotalk.project.user.vo.DepartmentsVo;
import com.todotalk.project.user.vo.TeamsVo;
import com.todotalk.project.user.vo.UserOrgsVo;
import com.todotalk.project.user.vo.UserPayloadVo;
import com.todotalk.project.user.vo.UserProfilesVo;
import com.todotalk.project.user.vo.UsersVo;

@Mapper
public interface AuthMapper {
	
	int checkUser(@Param("userId") String userId, @Param("password") String password);

	void createAccountUser(@Param("user") UsersVo userVo);

	void createAccountUserPro(@Param("userPro") UserProfilesVo userProVo);
	
	void createAccountUserOrg(@Param("userOrg") UserOrgsVo userOrgVo);
	
	List<DepartmentsVo> selectDep();

	List<TeamsVo> selectTeam(@Param("departmentId")String departmentId);

	UsersVo findByUserId(@Param("userId") String userId);
}
