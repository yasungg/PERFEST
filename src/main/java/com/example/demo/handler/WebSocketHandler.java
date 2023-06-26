package com.example.demo.handler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

@Slf4j
@RequiredArgsConstructor
public class WebSocketHandler implements org.springframework.web.socket.WebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println();
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println();
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        throw new Exception("websocket 전송 오류");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("websocket 연결이 해제되었습니다.!!");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
