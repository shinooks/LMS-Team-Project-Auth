package com.swhwang.authtestsrv.ldap.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
public class LdapConfig {
    // 2. Application.yaml에 의해 생성된 contextSource를 LdapTemplate 객체에 주입함.
    // LDAP 데이터 조회, 삽입, 삭제와 같은 작업을 수행하는 핵심 클래스.
    // DAO, Repository 클래스에 주입된다. (예: LdapRepository).
    @Bean
    public LdapTemplate ldapTemplate(LdapContextSource contextSource) {
        return new LdapTemplate(contextSource);
    }



}