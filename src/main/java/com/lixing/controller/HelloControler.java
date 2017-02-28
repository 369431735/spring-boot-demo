package com.lixing.controller;

import com.lixing.GirlProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2017/1/30.
 */
@RestController
public class HelloControler {

    @Value("${cupsize}")
    private String cupsize;
    @Autowired
    private GirlProperties girlProperties;

    @RequestMapping(value = "/hello")
    public String say(String id) {
        return id;
    }

}
