package com.example.demo.service;

import com.example.demo.domain.User;

import java.util.List;

public interface LoginService {
    int userlogin(String sname ,String spwd);

    int adduser(String sname,String spwd,String ssex);
    List uinfo();

}
