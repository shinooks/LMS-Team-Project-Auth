package com.swhwang.authtestsrv;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class AuthServerConfig {
    @Bean
    @Order(1) // 필터의 우선순위를 1로 설정 (제일 우선, 기본 양식 로그인 페이지 제공)
    SecurityFilterChain oAuth2SecFilterChain(HttpSecurity http) throws Exception {
        http.cors(config->config.configurationSource(new CorsConfigSource().corsConfigurationSource()));
        http.csrf().disable();
        http.authorizeRequests(authorizeRequests ->authorizeRequests.anyRequest().authenticated());

        OAuth2AuthorizationServerConfigurer authorizationServerConfigurer = new OAuth2AuthorizationServerConfigurer();
        authorizationServerConfigurer.oidc(Customizer.withDefaults());
        http.apply(authorizationServerConfigurer);

        return http.formLogin(Customizer.withDefaults()).build();
    }

    @Bean
    @Order(2) // 필터의 우선순위를 2로 설정
    SecurityFilterChain FormSecFilterChain(HttpSecurity http) throws Exception {
        http.cors(config->config.configurationSource(new CorsConfigSource().corsConfigurationSource()));
        http.csrf().disable();
        http.authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest()
                        .authenticated())
                .formLogin(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    UserDetailsService users() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        UserDetails user = User.builder()
                .username("admin@test.com")
                .password("password")
                .roles("STUDENT")
                .build();
        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // 평문 비밀번호 인코딩 사용
    }
}
