package com.todotalk.project.common.utiles;

import java.util.UUID;

public class MakeUuid {
	// 하이픈 포함 UUID
    public static String generate() {
        return UUID.randomUUID().toString();
    }
    // 하이픈 없는 UUID
    public static String generateNoDash() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
