package com.todotalk.project.auth.vo;

/*
 * IDE 자동완성, 타입 안정성 때문에 만듦
 * */
public class LoginResultVo {
	
    private boolean success;
    private String message;

    // 생성자, getter, setter
    public LoginResultVo(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }

}
