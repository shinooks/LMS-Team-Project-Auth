package com.swhwang.authtestclient;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class TestAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 인증 객체 출력
        System.out.println("Authentication Successful: " + authentication);
/* Authentication Successful: OAuth2AuthenticationToken
    [
    Principal=Name: [admin],
    Granted Authorities: [
        [OIDC_USER, SCOPE_openid]],
        User Attributes: [{
            sub=admin,
            aud=[articles-client],
            azp=articles-client,
            auth_time=2024-11-13T07:05:10Z,
            iss=http://auth-server:9000,
            exp=2024-11-13T07:35:10Z,
            iat=2024-11-13T07:05:10Z,
            nonce=ts0vrd1_lv7qFNUnwB1of5ycjeaonVmsHW7BMDFn2l0,
            jti=fb52ef7d-4292-47fd-9831-1231cea4d692,
            sid=EZIb0BwkZpAa9dNtIfQBV3DuAtw3gOSAHiiWtA0evAE}],
        Credentials=[PROTECTED],
        Authenticated=true,
        Details=WebAuthenticationDetails [RemoteIpAddress=127.0.0.1, SessionId=0C4D02E2780985E34665BFBB8AEA9A3F],
        Granted Authorities=[OIDC_USER, SCOPE_openid]]
        * */
    }
}
