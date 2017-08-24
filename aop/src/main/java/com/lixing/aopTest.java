package com.lixing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lixing on 2017/2/4.
 */
@Controller
public class aopTest {
    @RequestMapping(value ={"/","/*"})
    @ResponseBody
    public String testAop(){
        return "testAop";
    }
}
