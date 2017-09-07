package com.lixing;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Created by Administrator on 2017/9/7.
 */
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    UserDetailsService userService(){
        return  new UserService();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
    http.authorizeRequests().anyRequest().authenticated().
            and().formLogin().loginPage("/login").failureForwardUrl("/login?error").permitAll().
            and().logout().permitAll();}
}
