package com.lixing.jsp.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by lixing on 2017/2/16.
 */
@Controller
public class jspActionReq {
    @RequestMapping(value = "jumpjsp1")
    public String jump(String url){
        return "jsp/helloJsp";
    }
    @RequestMapping("/helloJsp")
    public String helloJsp(Map<String, Object> map) {
        return "helloJsp";
    }
}
