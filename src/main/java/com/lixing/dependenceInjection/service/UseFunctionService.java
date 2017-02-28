package com.lixing.dependenceInjection.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**使用功能类
 * Created by lixing on 2017/2/4.
 */@Service
public class UseFunctionService {
    @Autowired
     private FunctionService functionService;
    public String sayHello(String context){
        return functionService.sayHello(context);
    }

}
