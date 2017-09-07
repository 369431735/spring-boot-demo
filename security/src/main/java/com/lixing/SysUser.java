package com.lixing;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Administrator on 2017/9/5.
 */
@Entity
public class SysUser implements UserDetails {//让用户实现 UserDetails接口，我们的用户实体即为Spring Security所使用的用户
   @Id
   @GeneratedValue
    private Long id;

   private String  username;
   private String password;
   @ManyToMany(cascade={CascadeType.REFRESH},fetch = FetchType.EAGER)//配置用户和角色多对多的关系
   List<SysRole> roles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {//重写getAuthorities方法，将用户的角色作为权限
        List<GrantedAuthority> auths=new ArrayList<GrantedAuthority>();
        List<SysRole> roles=this.getRoles();
        for(SysRole sysRole:roles){
            auths.add(new SimpleGrantedAuthority(sysRole.getName()));
        }
        return auths;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
