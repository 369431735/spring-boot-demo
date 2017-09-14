package com.lixing;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2017/9/7.
 */
@Controller
public class IndexController {
    @Resource
    private UserService userService;

    @RequestMapping("/home")
    public String home() {
        return "home";

    }


    @PreAuthorize("hasRole('user')") //表示访问这个方法需要拥有user角色。如果希望控制到权限层面，可以使用@PreAuthorize(“hasPermission()”)
    @RequestMapping(value = "/admin",method = RequestMethod.GET)
    public String toAdmin(){

        return "helloAdmin";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "hello";

    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/")
    public String root() {
        return "index";

    }

    @RequestMapping("/403")
    public String error(){
        return "403";
    }
}
