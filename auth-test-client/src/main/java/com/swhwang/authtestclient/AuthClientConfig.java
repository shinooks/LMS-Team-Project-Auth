package com.swhwang.authtestclient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@EnableWebSecurity
public class AuthClientConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, TestAuthenticationSuccessHandler testAuthenticationSuccessHandler) throws Exception {
        http
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated() // 모든 요청에 대해 인증을 요구
                )
                // 사용자의 인증을 확인 후 oAuth2 Server로 리다이렉션 -> 인증 후 "loginPage" 경로로 돌아오면 인증 확인
                .oauth2Login(oauth2Login ->
                        oauth2Login.loginPage("/oauth2/authorization/articles-client-oidc")
                                .successHandler(testAuthenticationSuccessHandler))

                // oAuth2 클라이언트로 동작하며 Access Token이 만료되면 Refresh Token을 사용해 다시 가져오는 역할
                .oauth2Client(Customizer.withDefaults());
        return http.build();
    }
}
