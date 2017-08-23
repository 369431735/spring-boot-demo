package com.lixing.schedul;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Created by lixing on 2017/1/31.
 */
@Configuration
@EnableScheduling // 启用定时任务
public class SchedulingConfig {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Scheduled(cron = "0/5 * * * * ?") // 每5秒执行一次
    public void scheduler() {
        String threadName = Thread.currentThread().getName();
        System.out.println("threadName============"+threadName);
        System.out.println("基础定时任务每5秒执行一次");
    }

}

