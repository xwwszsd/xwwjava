package com.example.demo.config;

import com.example.demo.commen.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        LoginInterceptor loginInterceptor = new LoginInterceptor();
        InterceptorRegistration loginRegistry = registry.addInterceptor(loginInterceptor);

        System.out.println("拦截器启动");

        // 拦截路径
        loginRegistry.addPathPatterns("/**");
        // 排除路径
        loginRegistry.excludePathPatterns("/");
        loginRegistry.excludePathPatterns("/loginuser");
        loginRegistry.excludePathPatterns("/register");
        loginRegistry.excludePathPatterns("/registergo");
        //loginRegistry.excludePathPatterns("/loginout");
        // 排除资源请求
        //loginRegistry.excludePathPatterns("*.css");
        loginRegistry.excludePathPatterns("/js/jquery/*.js");
        //loginRegistry.excludePathPatterns("/image/login/*.png");
    }

}
