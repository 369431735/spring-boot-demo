package com.lixing;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {
    @RequestMapping(value="/")
    public String test(){
        return "hello world";
    }
}
