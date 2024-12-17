package com.swhwang.authtestclient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
public class ArticlesController {

    private final WebClient webClient; // WebClient는 Spring WebFlux에서 제공하는 비동기 HTTP 클라이언트

    public ArticlesController(WebClient webClient) {
        this.webClient = webClient.mutate().build();
    }

    @GetMapping(value = "/articles")
    public String[] getArticles(
            // Registration: articles-client-authorization-code 이라는 oAuth2 인증 클라이언트를 이용
            // OAuth2AuthorizedClient 객체는 현재 인증된 사용자의 액세스 토큰 및 인증 정보를 포함하고 있음.
            // 새로운 인증 클라이언트를 사용한 이유는 사용자 인증에 사용된 토큰과 리소스 서버가 원하는 권한이 다르기 때문
            // 리소스 서버에서는 articels.read 스코프를 요구했다. //.hasAuthority("SCOPE_articles.read"))
            @RegisteredOAuth2AuthorizedClient("articles-client-authorization-code") OAuth2AuthorizedClient authorizedClient
    ) {
        return this.webClient
                // GET 메서드로 URI 경로에 HTTP 요청을 보냄
                .get().uri("http://127.0.0.1:8090/articles")
                // attributes(): oAuth2AuthorizedClient 객체를 이용해 HTTP 요청 시 인증 토큰과 함께 전송
                .attributes(oauth2AuthorizedClient(authorizedClient))
                // retrieve(): HTTP 응답을 가져옴
                .retrieve()
                // 응답 바디를 String[] 형식의 Mono(비동기 단일 값 컨테이너)로 변환
                .bodyToMono(String[].class)
                // 기본 비동기 작업을 동기식으로 변환, 즉시 결과를 가져옴
                .block();
    }
}