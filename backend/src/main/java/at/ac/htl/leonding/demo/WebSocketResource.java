package at.ac.htl.leonding.demo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import io.quarkus.logging.Log;
import io.quarkus.scheduler.Scheduled;
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
    Map<String, Session> sessions = new ConcurrentHashMap<>(); 

    @OnOpen
    public void onOpen(Session session, @PathParam("name") String name) {
        Log.infof("onOpen> %s", name);
        broadcast("%s connected", name);
        sessions.put(name, session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("name") String name) {
        sessions.remove(name);
        broadcast("%s left", name);
        Log.infof("onClose> %s", name);
    }

    @OnError
    public void onError(Session session, @PathParam("name") String name, Throwable throwable) {
        sessions.remove(name);
        Log.info("onError> " + name, throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("name") String name) {
        Log.infof("onMessage> %s: %s", name, message);
    }

    public void broadcast(String message, Object... args) {
        var msg = String.format(message, args);
        Log.infof("broadcast> %s", msg);
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(msg, result ->  {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }
    @Scheduled(every = "30s")
    void ping() {
        broadcast("ping from server");
    }
}
