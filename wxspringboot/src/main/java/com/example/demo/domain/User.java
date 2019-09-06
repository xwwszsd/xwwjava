package com.example.demo.domain;

import java.io.Serializable;

public class User implements Serializable {

    public void setSname(String sname) {
        this.sname = sname;
    }

    public void setSpwd(String spwd) {
        this.spwd = spwd;
    }

    public void setSsex(String ssex) {
        this.ssex = ssex;
    }

    @Override
    public String toString() {
        return "User{" +
                "sname='" + sname + '\'' +
                ", spwd='" + spwd + '\'' +
                ", ssex='" + ssex + '\'' +
                '}';
    }

    public String getSname() {
        return sname;
    }

    public String getSpwd() {
        return spwd;
    }

    public String getSsex() {
        return ssex;
    }

    private String sname;
    private String spwd;
    private String ssex;
}
