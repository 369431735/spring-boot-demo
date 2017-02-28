package com.lixing.bean;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/1/30.
 */
@Entity
public class Girl {
    @Id
    @GeneratedValue
    private Integer id;
    private String cuosize;
    private Integer age;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "FK_CLAZZ_ID", referencedColumnName = "ID")
    private Clazz clazz;

    public Girl() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCuosize() {
        return cuosize;
    }

    public void setCuosize(String cuosize) {
        this.cuosize = cuosize;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Clazz getClazz() {
        return clazz;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }
}
