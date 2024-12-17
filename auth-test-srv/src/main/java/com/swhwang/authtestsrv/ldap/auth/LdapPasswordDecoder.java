package com.swhwang.authtestsrv.ldap.auth;

import org.springframework.ldap.support.LdapEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class LdapPasswordDecoder {

    private BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();

    public boolean matches(String rawPassword, String ldapStoredPassword) {
        // 1. {BCRYPT} 제거
        if (!ldapStoredPassword.startsWith("{BCRYPT}")) {
            throw new IllegalArgumentException("Unsupported password format: " + ldapStoredPassword);
        }
        String base64Encoded = ldapStoredPassword.substring("{BCRYPT}".length());

        // 2. Base64 디코딩
        byte[] decodedBytes = LdapEncoder.parseBase64Binary(base64Encoded);
        String bcryptHash = new String(decodedBytes);

        // 3. BCrypt 해시와 비교
        return bcryptPasswordEncoder.matches(rawPassword, bcryptHash);
    }
}