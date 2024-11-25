import { Room } from "colyseus";

// 这段代码定义了一个名为 ChatRoom 的房间类，它是 Colyseus 框架中的一个自定义房间实现。
// 这个房间类继承自 Colyseus 的 Room 类，并实现了房间的生命周期方法
export class ChatRoom extends Room {
    // this room supports only 4 clients connected
    // 表示这个房间最多支持 4 个客户端连接
    maxClients = 4;

    onCreate(options) {
        console.log("房间被创建!", options);

        this.onMessage("message", (client, message) => {
            console.log(
                "ChatRoom 接收到消息从",
                client.sessionId,
                ":",
                message
            );
            // 将消息内容广播给所有连接的客户端（包括发送消息的客户端）
            this.broadcast("messages", `(${client.sessionId}) ${message}`);
        });
    }

    onJoin(client) {
        console.log("有客户端加入了房间！", client.sessionId);

        this.broadcast("messages", `${client.sessionId} joined.`);
    }

    onLeave(client) {
        console.log("有客户端离开了房间！", client.sessionId);
        this.broadcast("messages", `${client.sessionId} left.`);
    }

    onDispose() {
        console.log("房间被销毁！");
    }
}
