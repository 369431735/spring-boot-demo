package com.lixing;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import java.io.IOException;

/**
 * Created by lixing on 2017/1/31.
 */
@Component("myFilter")
public class MyFilter implements Filter {
    /**
     * @see Filter#destroy()
     */
    @Override
    public void destroy() {
        System.out.println("destroy...");
    }

    /**
     * @param arg0
     * @param arg1
     * @param arg2
     * @throws IOException
     * @throws ServletException
     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
     */
    @Override
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
            throws IOException,
            ServletException {
        System.out.println("doFilter...");
        arg2.doFilter(arg0, arg1);
    }

    /**
     * @param arg0
     * @throws ServletException
     * @see Filter#init(FilterConfig)
     */
    @Override
    public void init(FilterConfig arg0) throws ServletException {
        System.out.println("filter init...");
    }

}
