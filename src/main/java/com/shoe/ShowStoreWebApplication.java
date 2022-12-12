package com.shoe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class ShowStoreWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShowStoreWebApplication.class, args);
    }

}
