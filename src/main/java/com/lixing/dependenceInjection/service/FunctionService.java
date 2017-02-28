package com.lixing.dependenceInjection.service;

import org.springframework.stereotype.Service;

/**功能类
 * Created by lixing on 2017/2/4.
 */
@Service
public class FunctionService {
    public String sayHello(String  context){return context;}
}
