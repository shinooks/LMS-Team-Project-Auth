package com.swhwang.authtestsrv.auth2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = false)
public class AuthServerConfig {


    @Bean
    @Order(1)
        // 필터의 우선순위를 1로 설정 (oAuth2 토큰이 있는 경우에만 해당)
    SecurityFilterChain oAuth2SecFilterChain(HttpSecurity http) throws Exception {
        http.cors(config -> config.configurationSource(new CorsConfigSource().corsConfigurationSource()));
        http.csrf().disable();
        http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest().authenticated());

        // OAuth2 인증 서버 설정
        OAuth2AuthorizationServerConfigurer authorizationServerConfigurer = new OAuth2AuthorizationServerConfigurer();
        authorizationServerConfigurer.oidc(Customizer.withDefaults());

        http.apply(authorizationServerConfigurer);


        return http.formLogin(Customizer.withDefaults()).build(); // 사용자 인증을 위해 폼 로그인 이동
    }

    @Bean
    @Order(2)
        // 필터의 우선순위를 2로 설정
    SecurityFilterChain FormSecFilterChain(HttpSecurity http) throws Exception {
        http.cors(config -> config.configurationSource(new CorsConfigSource().corsConfigurationSource()));
        http.csrf().disable();
        http.authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest()
                        .authenticated())
                .formLogin(Customizer.withDefaults());
        return http.build();
    }


    // BCrypt 비밀번호 인코딩
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }




}