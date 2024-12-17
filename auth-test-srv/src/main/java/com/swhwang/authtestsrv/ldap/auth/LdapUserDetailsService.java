package com.swhwang.authtestsrv.ldap.auth;

import com.swhwang.authtestsrv.ldap.domain.LdapUserCn;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

import static org.springframework.ldap.query.LdapQueryBuilder.query;


@Service
public class LdapUserDetailsService implements UserDetailsService {

    private final LdapTemplate ldapTemplate;
    private BCryptPasswordEncoder passwordEncoder;

    public LdapUserDetailsService(LdapTemplate ldapTemplate) {
        this.ldapTemplate = ldapTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LdapUserCn user = ldapTemplate.findOne(
                query().where("uid").is(username),
                LdapUserCn.class
        );

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        // 비밀번호를 passwordEncoder로 처리
        String encodedPassword = passwordEncoder.encode("aaa");
        System.out.println("인코딩한 패스워드: " + encodedPassword);
        String password = new String(user.getPassword().getBytes(), StandardCharsets.UTF_8);
        System.out.println("DB에서 가져온 패스워드"+password);

        return User.withUsername(user.getUid())
                .password(user.getPassword())
                .roles("USER") // 필요한 경우 역할 추가
                .build();
    }
}
