package com.swhwang.authtestclient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class RestAPITestConfig {
    @Bean
        // OAuth2AuthorizedClientManager는 OAuth2 인증을 처리하고 액세스 토큰을 관리하는 역할
    WebClient webClient(OAuth2AuthorizedClientManager authorizedClientManager) {
        // ServletOAuth2AuthorizedClientExchangeFilterFunction는 OAuth2 인증을 지원하는 Spring Security에서 제공하는 필터 함수
        // WebClient 요청에 OAuth2 액세스 토큰을 추가할 수 있도록 합니다.
        ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2Client =
                new ServletOAuth2AuthorizedClientExchangeFilterFunction(authorizedClientManager);
        return WebClient.builder()
                // oaut2Client에 추가된 액세스 토큰을 자동으로 포함
                .apply(oauth2Client.oauth2Configuration())
                .build();
    }
    @Bean
        // ClientRegistrationRepository는 클라이언트 등록 정보를 가지고 있음
        // OAuth2AuthorizedClientRepository는 권한이 부여된 클라이언트 정보를 가짐
    OAuth2AuthorizedClientManager authorizedClientManager(ClientRegistrationRepository clientRegistrationRepository,
                                                          OAuth2AuthorizedClientRepository authorizedClientRepository)
    {   //OAuth2AuthorizedClientProvider는 사용자 대신 oAuth2 Server로 인증과 토큰 갱신을 요청하는 객체
        OAuth2AuthorizedClientProvider authorizedClientProvider =
                OAuth2AuthorizedClientProviderBuilder.builder()
                        .authorizationCode() // Grant Type 중 Authorization_Code를 사용
                        .refreshToken() // Refresh 토큰으로 액세스 토큰 재발급에 사용
                        .build();

        // DefaultOAuth2AuthorizedClientManager는 OAuth2 클라이언트들을 관리하는 객체
        DefaultOAuth2AuthorizedClientManager authorizedClientManager =
                new DefaultOAuth2AuthorizedClientManager(clientRegistrationRepository, authorizedClientRepository);

        // DefaultOAuth2AuthorizedClientManager 객체에 oAuth2 Serve에서 가져온 인증과 토큰을 저장
        authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

        return authorizedClientManager;
    }
}
