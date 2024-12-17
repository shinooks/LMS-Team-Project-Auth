package com.swhwang.authtestsrv.ldap.auth;

import org.springframework.security.crypto.password.PasswordEncoder;

public class LdapPasswordEncoder implements PasswordEncoder {

    private final LdapPasswordDecoder ldapPasswordDecoder = new LdapPasswordDecoder();

    @Override
    public String encode(CharSequence rawPassword) {
        throw new UnsupportedOperationException("Encoding is not supported in this context.");
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return ldapPasswordDecoder.matches(rawPassword.toString(), encodedPassword);
    }
}