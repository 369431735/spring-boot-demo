package com.lixing.jsp.action;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by lixing on 2017/2/16.
 */
@RestController
public class jspAction {
    @RequestMapping(value = "jumpjsp")
    public ModelAndView jump(String url){
        ModelAndView mv = new ModelAndView("index");
        return mv;
    }
}
