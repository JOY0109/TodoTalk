package com.todotalk.project.common;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todotalk.project.auth.security.CustomUserDetails;

import jakarta.servlet.http.HttpSession;

@RestController
public class SessionController {

	@GetMapping("/sessionUser")
    public Map<String, Object> getSessionUser(Authentication authentication) {
		
        Map<String, Object> result = new HashMap<>();
        
        if (authentication.getPrincipal() instanceof CustomUserDetails customUser) {
            result.put("userId", customUser.getUserId());     // UUID
            result.put("loginId", customUser.getUsername());  // 로그인 ID
            result.put("rolse", customUser.getAuthorities());  //권한
            result.put("realName", customUser.getRealName() );
        }
        return result;
    }
}

