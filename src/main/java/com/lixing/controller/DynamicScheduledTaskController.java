package com.lixing.controller;

import com.lixing.Scheduling.DynamicScheduledTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lixing on 2017/1/31.
 */
@RestController
public class DynamicScheduledTaskController {
    @Autowired
   private DynamicScheduledTask dynamicScheduledTask;
    // 更新动态任务时间
    @RequestMapping("/updateDynamicScheduledTask")
    public void updateDynamicScheduledTask() {
        dynamicScheduledTask.setCron("0/10 * * * * ?");

    }
}
