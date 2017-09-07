package com.lixing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/9/7.
 */
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private SysUserDao sysUserDao;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        SysUser sysUser=sysUserDao.findByUsername(userName);
        if(sysUser==null){
            throw new UsernameNotFoundException("用户名不存在");
        }
        return sysUser;
    }


}
