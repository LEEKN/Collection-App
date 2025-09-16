package com.collection.controller;

import com.collection.model.dto.UserLoginRequest;
import com.collection.model.dto.UserLoginResponse;
import com.collection.model.dto.UserRegisterRequest;
import com.collection.model.dto.UserRegisterResponse;
import com.collection.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserRegisterResponse register(@RequestBody UserRegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public UserLoginResponse login(@RequestBody UserLoginRequest request, HttpSession session) {
        // 管理者檢查
        if (request.getAccount().equals("admin") && request.getPassword().equals("00000000")) {
            session.setAttribute("user", "admin");

            var response = new UserLoginResponse();
            response.setMsg("登入成功");
            response.setStatus(true);

            return response;
        }

        UserLoginResponse response = userService.login(request);

        if (response.getStatus()) {
            session.setAttribute("user", request.getAccount());
        }

        return response;
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "已登出";
    }
}