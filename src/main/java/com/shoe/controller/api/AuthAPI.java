package com.shoe.controller.api;

import com.shoe.dao.RoleDAO;
import com.shoe.dao.UserDAO;
import com.shoe.dto.user.LoginParam;
import com.shoe.dto.user.SignUpParam;
import com.shoe.entity.Role;
import com.shoe.entity.User;
import com.shoe.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthAPI {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private RoleDAO roleDAO;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signIn")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginParam loginParam){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginParam.getUsername(), loginParam.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>(authentication.getName(), HttpStatus.OK);
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpParam signUpParam){

        // add check for email exists in DB
        if(userDAO.existsByUsername(signUpParam.getUsername())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.CONFLICT);
        }

        // create user object
        User user = userMapper.toUser(signUpParam);

        Role roles = roleDAO.findByName("ROLE_USER").get();
        user.setRoles(Collections.singleton(roles));

        userDAO.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);

    }
}
