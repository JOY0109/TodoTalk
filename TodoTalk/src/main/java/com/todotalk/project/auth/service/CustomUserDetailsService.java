package com.todotalk.project.auth.service;
import com.todotalk.project.user.vo.UsersVo;
import com.todotalk.project.auth.mapper.AuthMapper;
import com.todotalk.project.auth.security.CustomUserDetails;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthMapper authMapper;

    public CustomUserDetailsService(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UsersVo user = authMapper.findByUserId(userId);
        if (user == null) throw new UsernameNotFoundException("사용자 없음");
        
        return new CustomUserDetails(
	        		user.getLoginId(), 
	        		user.getLoginPw(), 
	        		user.getUserId(),
	        		user.getRealName(),
	        		Collections.singletonList(new SimpleGrantedAuthority(user.getAuthRole()))
        		);
    }
}
