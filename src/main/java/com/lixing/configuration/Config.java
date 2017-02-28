package com.lixing.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by lixing on 2017/2/4.
 */
@Configuration//声明该类是一个配置类
@ComponentScan("com.lixing")//会自动扫描包名下使用@Service、@Component、@Respository、@Controller的类，并注册为Bean
public class Config {
}
