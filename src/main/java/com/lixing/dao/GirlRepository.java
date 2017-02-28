package com.lixing.dao;

import com.lixing.bean.Girl;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2017/1/30.
 */
public interface GirlRepository extends JpaRepository<Girl, Integer> {
}
