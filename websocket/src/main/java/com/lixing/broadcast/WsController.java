package com.lixing.broadcast;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by sang on 16-12-22.
 */
@Controller
public class WsController {
    @MessageMapping("/welcome")  //当浏览器向服务端发送请求时，通过@MessageMapping映射/welcome这个地址。类似于@RequestMapping
    @SendTo("/topic/getResponse") //当服务端有消息时，会对订阅了@SendTo
    public ResponseMessage say(RequestMessage message) {
        System.out.println(message.getName());
        return new ResponseMessage("welcome," + message.getName() + " !");
    }
}
