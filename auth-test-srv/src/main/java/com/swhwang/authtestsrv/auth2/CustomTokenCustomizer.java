package com.swhwang.authtestsrv.auth2;

import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.stereotype.Component;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Component
public class CustomTokenCustomizer implements OAuth2TokenCustomizer<JwtEncodingContext> {

    @Override
    public void customize(JwtEncodingContext context) {
        if (context.getTokenType().getValue().equals("access_token")) {
            var authorities = context.getPrincipal().getAuthorities();

            // 권한 정보를 roles 클레임으로 추가
            List<String> roles = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();
            context.getClaims().claim("roles", roles);
        }
    }
}
