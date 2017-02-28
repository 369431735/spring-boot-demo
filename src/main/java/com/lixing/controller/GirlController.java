package com.lixing.controller;

import com.lixing.bean.Clazz;
import com.lixing.bean.Girl;
import com.lixing.dao.GirlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2017/1/30.
 */
@RestController
public class GirlController {
    @Autowired
    private GirlRepository girlRepository;

    @RequestMapping(value = "findAll")
    public List<Girl> girlList() {
        return girlRepository.findAll();
    }

    @RequestMapping(value = "saveGirl")
    public Girl saveGirl() {
        Girl girl = new Girl();
        girl.setAge(23);
        girl.setCuosize("b");
        Clazz clazz = new Clazz();
        clazz.setName("asq");
        girl.setClazz(clazz);
        girlRepository.save(girl);

        return girl;
    }
}
