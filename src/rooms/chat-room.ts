// import { Room } from "colyseus";
// import * as protobuf from "protobufjs";

// const root = protobuf.loadSync(__dirname + "/../protobuf/person.proto");
// const Person = root.lookupType("Person");

// // 这段代码定义了一个名为 ChatRoom 的房间类，它是 Colyseus 框架中的一个自定义房间实现。
// // 这个房间类继承自 Colyseus 的 Room 类，并实现了房间的生命周期方法
// export class ChatRoom extends Room {
//     // this room supports only 4 clients connected
//     // 表示这个房间最多支持 4 个客户端连接
//     maxClients = 4;

//     onCreate(options) {
//         console.log("房间被创建!", options);

//         this.onMessage("typeMessage", (client, message) => {
//             var decodedMessage = Person.decode(new Uint8Array(message));
//             console.log(
//                 "Received message from",
//                 client.sessionId,
//                 ":",
//                 decodedMessage
//             );
//             console.log(
//                 "解码后的文本:",
//                 decodedMessage.age,
//                 decodedMessage.name
//             );

//             var payload = {
//                 age: decodedMessage.age,
//                 name: decodedMessage.name,
//             };
//             var errMsg = Person.verify(payload);
//             if (errMsg) throw Error(errMsg);

//             var responseMessage = Person.create(payload);
//             var buffer = Person.encode(responseMessage).finish();
//             this.broadcast("typeMessage", buffer);
//         });
//     }

//     onJoin(client) {
//         console.log("有客户端加入了房间！", client.sessionId);

//         this.broadcast("messages", `${client.sessionId} joined.`);
//     }

//     onLeave(client) {
//         console.log("有客户端离开了房间！", client.sessionId);
//         this.broadcast("messages", `${client.sessionId} left.`);
//     }

//     onDispose() {
//         console.log("房间被销毁！");
//     }
// }
