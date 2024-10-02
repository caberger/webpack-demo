package at.ac.htl.leonding.demo;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/ws/{name}")
@ApplicationScoped
public class WebSocketResource {

    @OnOpen
    public void onOpen(Session session, @PathParam("name") String name) {
        Log.infof("onOpen> %s", name);
    }

    @OnClose
    public void onClose(Session session, @PathParam("name") String name) {
        Log.infof("onClose> %s", name);
    }

    @OnError
    public void onError(Session session, @PathParam("name") String name, Throwable throwable) {
        Log.info("onError> " + name, throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("name") String name) {
        Log.infof("onMessage> %s: %s", name, message);
    }
}
