package com.swhwang.authtestsrv.ldap.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;


@Configuration
public class LdapSecurityConfig{
    
    private final LdapContextSource ldapContextSource;



    public LdapSecurityConfig(LdapContextSource ldapContextSource) {
        this.ldapContextSource = ldapContextSource;
    }
// 기본 로그인 폼은 UsernamePasswordAuthenticationFilter가 입력을 받아 인증 토큰을 반환

/* 기존:
* DaoAuthenticationProvider가 UserDetails와 USerDetailsService를 이용해 인증 처리 (Authntication 객체 생성)
*/

/* [1] LDAP 인증의 시작점
* LdapAuthenticationProvider: 서버와 직접 통신해 사용자 인증,결과를 가져옴
* LdapUserDetailsService: 사용자 정보를 UserDetails 객체로 변환
* LdapAuthoritiesPopulator를 이용해 권한(Role) 생성
*/

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()

                .ldapAuthoritiesPopulator(new CustomAuthoritiesPopulator()) // 커스텀 권한 설정
                .userSearchBase("ou=사용자") // 사용자를 탐색할 기준 경로 Base Dn
                .userSearchFilter("(uid={0})")  // 탐색 조건을 uid로 지정

                .contextSource(ldapContextSource)

                .passwordCompare()
                .passwordEncoder(new LdapPasswordEncoder()) // Bcyper 기반으로 로그인하는데 아스키 디코딩 -> {Bcrypt}Base 64 디코딩 -> 패스워드 비교
                .passwordAttribute("userPassword");
    }

}
