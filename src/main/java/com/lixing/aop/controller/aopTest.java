package com.lixing.aop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lixing on 2017/2/4.
 */
@Controller
@RequestMapping("/aop")
public class aopTest {
    @RequestMapping(value ="/testAop")
    @ResponseBody
    public String testAop(){
        return "testAop";
    }
}
