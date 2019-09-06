package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class LoginController {

    @Autowired
    LoginService loginService;

    @RequestMapping("/")
    public String tz()
    {
        return "login";
    }

    @RequestMapping("/index")
    public String in(){
        return "index";
    }

    @RequestMapping("/register")
    public String register()
    {
        return "register";
    }
    @PostMapping("/loginuser")
    @ResponseBody
    public int Login(@RequestBody User user, HttpServletRequest request){

        System.out.println(user.getSname());
        HttpSession session=request.getSession();
        session.setAttribute("user",user);
//        User u=new User();
//        u.setSname(sname);
//        u.setSpwd(spwd);

        return loginService.userlogin(user.getSname(),user.getSpwd());
    }

    @RequestMapping("/registergo")
    @ResponseBody
    public int zc(@RequestBody User user)
    {
        System.out.println(user.getSname());
        return loginService.adduser(user.getSname(),user.getSpwd(),user.getSsex());
    }

    @RequestMapping("/list")
    @ResponseBody
    public List userinfo()
    {
        return loginService.uinfo();
    }
}
