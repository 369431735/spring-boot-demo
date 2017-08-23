package com.lixing.schedul;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SchedulApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchedulApplication.class, args);
	new DynamicScheduledTask().setCron("0/10 * * * * ?");
	}
}
