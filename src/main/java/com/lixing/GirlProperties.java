package com.lixing;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2017/1/30.
 */
@Component
@ConfigurationProperties(prefix = "girl")
public class GirlProperties {
    private String cupsize;
    private int age;

    public String getCupsize() {
        return cupsize;
    }

    public void setCupsize(String cupsize) {
        this.cupsize = cupsize;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "girlProperties{" +
                "cupsize='" + cupsize + '\'' +
                ", age=" + age +
                '}';
    }
}
