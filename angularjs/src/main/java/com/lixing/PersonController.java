package com.lixing;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2017/9/3.
 */
@RestController
public class PersonController {
    @RequestMapping(value="/search")
    public  Person search(String personName){
        return new Person(personName,32,"sichuang");
    }
}
