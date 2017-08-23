package com.lixing.schedul;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;

import java.util.Date;
import java.util.concurrent.ScheduledFuture;

/****
 * 非注解方式实现定时器的动态控制
 */
public class DynamicTask {
    @Autowired
    private ThreadPoolTaskScheduler threadPoolTaskScheduler;

    private ScheduledFuture<?> future;

    @Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
        return new ThreadPoolTaskScheduler();
    }


    public String startCron() {
        future = threadPoolTaskScheduler.schedule(new MyRunnable(), new CronTrigger("0/5 * * * * *"));
        System.out.println("DynamicTask.startCron()");
        return "startCron";
    }


    public String stopCron() {
        if (future != null) {
            future.cancel(true);
        }
        System.out.println("DynamicTask.stopCron()");
        return "stopCron";
    }


    public String startCron10() {
        stopCron();// 先停止，在开启.
        future = threadPoolTaskScheduler.schedule(new MyRunnable(), new CronTrigger("*/10 * * * * *"));
        System.out.println("DynamicTask.startCron10()");
        return "changeCron10";
    }

    private class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("DynamicTask.MyRunnable.run()，" + new Date());
        }
    }
}
