package com.todotalk.project.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.todotalk.project.auth.mapper.AuthMapper;
import com.todotalk.project.auth.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // ✅ 전체 허용
            .headers(headers -> headers
                .cacheControl(cache -> cache.disable()) // 캐시 무효화
            )
            .formLogin(form -> form
                .loginPage("/") // 로그인 폼
                .loginProcessingUrl("/login-process") // 로그인 처리 URL
                .usernameParameter("userId")
                .passwordParameter("password")
                .defaultSuccessUrl("/project/list", true)
                .failureUrl("/?error=true")
                .permitAll()
            )
	        .logout(logout -> logout
        	    .logoutUrl("/logout")
        	    .logoutSuccessUrl("/") // 로그아웃 후 이동할 페이지
        	    .permitAll()
        	);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
