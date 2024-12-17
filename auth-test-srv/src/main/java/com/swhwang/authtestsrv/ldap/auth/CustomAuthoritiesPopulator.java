package com.swhwang.authtestsrv.ldap.auth;

import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.stereotype.Component;

import javax.naming.ldap.LdapName;
import javax.naming.ldap.Rdn;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class CustomAuthoritiesPopulator implements LdapAuthoritiesPopulator {
    @Override
    public Collection<? extends GrantedAuthority> getGrantedAuthorities(DirContextOperations userData, String username) {
//        // 사용자 패스워드 확인용 코드
//        byte[] userPasswordBytes = (byte[]) userData.getObjectAttribute("userPassword");
//        if (userPasswordBytes != null) {
//            String userPassword = new String(userPasswordBytes, StandardCharsets.UTF_8);
//            System.out.println("LDAP userPassword: " + userPassword);
//        } else {
//            System.out.println("LDAP userPassword attribute is null.");
//        }
        List<GrantedAuthority> authorities = new ArrayList<>();

        try {
            // 사용자 DN 가져오기
            String dn = userData.getDn().toString();

            // 사용자 DN으로부터 OU를 추출, 권한으로 부여
            // uid=S950002,ou=9500,ou=students,ou=Users,dc=sesac-univ,dc=click
            LdapName ldapName = new LdapName(dn);
            for (Rdn rdn : ldapName.getRdns()) {
                if (rdn.getType().equalsIgnoreCase("ou")) {
                    // OU를 ROLE_* 형식으로 변환
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + rdn.getValue().toString().toUpperCase()));
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse DN for roles: " + e.getMessage(), e);
        }

        // 기본 권한 추가
        authorities.add(new SimpleGrantedAuthority("ROLE_BASIC"));

        return authorities;
    }
}
