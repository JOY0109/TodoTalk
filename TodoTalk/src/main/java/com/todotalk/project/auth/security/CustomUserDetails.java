package com.todotalk.project.auth.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {
    private final String userId;    // ← UUID
    private final String realName;

    public CustomUserDetails(String username, String password, String userId, String realName, Collection<? extends GrantedAuthority> roles) {
        super(username, password, roles);
        this.userId = userId;
        this.realName = realName;
    }

    public String getUserId() {
        return userId;
    }

    public String getRealName() {
        return realName;
    }
}
