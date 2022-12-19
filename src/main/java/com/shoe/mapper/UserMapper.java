package com.shoe.mapper;

import com.shoe.dto.user.SignUpParam;
import com.shoe.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Locale;

@Component
public class UserMapper {
    @Autowired
    PasswordEncoder passwordEncoder;
    public User toUser(SignUpParam signUpParam) {
        return new User()
                .setFullName(signUpParam.getFullName().toLowerCase())
                .setUsername(signUpParam.getUsername())
                .setPassword(passwordEncoder.encode(signUpParam.getPassword()))
                .setRegisteredAt(Instant.now());
    }
}
