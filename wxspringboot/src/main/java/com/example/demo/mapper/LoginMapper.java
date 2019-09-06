package com.example.demo.mapper;

import com.example.demo.domain.User;

import java.util.List;

public interface LoginMapper {
    int userlogin(String sname ,String spwd);

    int adduser(String sname,String spwd,String ssex);

    List uinfo();
}
