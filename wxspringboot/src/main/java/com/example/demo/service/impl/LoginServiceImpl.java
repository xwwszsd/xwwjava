package com.example.demo.service.impl;

import com.example.demo.domain.User;
import com.example.demo.mapper.LoginMapper;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    LoginMapper loginMapper;


    @Override
    public int userlogin(String sname ,String spwd) {
        int a=loginMapper.userlogin(sname,spwd);
        if ( a> 0)
        {
            return 1;
        }
        else {
            return 0;
        }
    }

    @Override
    public int adduser(String sname, String spwd,String ssex) {

        int a=loginMapper.userlogin(sname,spwd);
        if (a>0)
        {
            System.out.println("用户已存在");
            return 0;
        }
        else{
            System.out.println("可以注册");
            loginMapper.adduser(sname,spwd,ssex);

            return 1;

        }
    }

    @Override
    public List uinfo() {
        return loginMapper.uinfo();
    }


}
