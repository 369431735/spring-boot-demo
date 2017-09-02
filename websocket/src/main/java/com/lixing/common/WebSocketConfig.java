package com.lixing.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;


@Configuration
@EnableWebSocketMessageBroker //启用STOMP协议来传输基于代理（message broker）的消息。这时控制器支持使用@MessageMapping,就像使用@RequestMappiong一样
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) { //注册STOMP协议节点，并映射指定的URL。
        stompEndpointRegistry.addEndpoint("/endpointSang").withSockJS();   //注册STOMP的endpoint,并指定使用SockJS协议
        stompEndpointRegistry.addEndpoint("/endpointChat").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue","/topic");  //配置消息代理
    }

}
