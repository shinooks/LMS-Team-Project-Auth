package com.swhwang.resourcetestserver;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


public class ResServerConfig {
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.securityMatcher("/articles/**")
//                .authorizeHttpRequests(authorize -> authorize.anyRequest()
//                        .hasAuthority("SCOPE_articles.read"))
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
//        return http.build();
//    }

public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .authorizeRequests(authorize -> authorize
                    .requestMatchers("/public/**").permitAll() // 공개 리소스
                    .requestMatchers("/admin/**").hasRole("관리자") // 관리자 권한
                    .requestMatchers("/articles/**").hasRole("학생") // 학생 권한
                    .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt()); // JWT 인증 활성화

    return http.build();
}


}
