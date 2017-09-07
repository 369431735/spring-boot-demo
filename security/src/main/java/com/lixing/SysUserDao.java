package com.lixing;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2017/9/7.
 */
public interface SysUserDao  extends JpaRepository<SysUser,Long>{
    SysUser findByUsername(String  userName);
}
