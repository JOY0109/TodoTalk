package com.todotalk.project.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.todotalk.project.TodoTalkApplication;
import com.todotalk.project.auth.mapper.AuthMapper;
import com.todotalk.project.common.utiles.MakeUuid;
import com.todotalk.project.user.vo.DepartmentsVo;
import com.todotalk.project.user.vo.TeamsVo;
import com.todotalk.project.user.vo.UserPayloadVo;
import com.todotalk.project.user.vo.UsersVo;

@Service
@Transactional
public class AuthService {

	private final PasswordEncoder passwordEncoder;

	@Autowired
	AuthMapper authMapper;
	
	@Autowired
    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

	
	/**
	 * @설명:   계정생성
	 * @작성일: 2025. 6. 16.
	 */
	public void createAccount(UserPayloadVo userData) {
		String userId	= MakeUuid.generateNoDash();
		String rawPw 	= userData.getUser().getLoginPw();
		String password = passwordEncoder.encode(rawPw);
		
		userData.getUser().setUserId(userId);
		userData.getUser().setLoginPw(password);
		userData.getUserPro().setUserId(userId);
		userData.getUserPro().setUserProfilesId(MakeUuid.generateNoDash());
		userData.getUserOrg().setUserId(userId);
		userData.getUserOrg().setUserORgId(MakeUuid.generateNoDash());
		
		authMapper.createAccountUser(userData.getUser());
		authMapper.createAccountUserPro(userData.getUserPro());
		authMapper.createAccountUserOrg(userData.getUserOrg());
	}

	public List<DepartmentsVo> selectDep() {
		return authMapper.selectDep();
	}

	public List<TeamsVo> selectTeam(String departmentId) {
		return authMapper.selectTeam(departmentId);
	}

}
