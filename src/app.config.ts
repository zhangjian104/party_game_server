import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { auth } from "@colyseus/auth";
import path from "path";
import serveIndex from "serve-index";
import express from "express";

import "./config/auth";

// Import demo room handlers
import { LobbyRoom, RelayRoom } from "colyseus";
// import { ChatRoom } from "./rooms/chat-room";
import { ProtoRoom } from "./rooms/proto-room";

export default config({
    options: {
        devMode: true,
    },

    initializeGameServer: (gameServer) => {
        // Define "lobby" room
        gameServer.define("lobby", LobbyRoom);

        // Define "relay" room
        gameServer
            .define("relay", RelayRoom, { maxClients: 4 })
            .enableRealtimeListing();

        // Define "chat" room
        // gameServer.define("chat", ChatRoom).enableRealtimeListing();
        gameServer.define("proto", ProtoRoom).enableRealtimeListing();

        gameServer.onShutdown(function () {
            console.log(`游戏服务器已关闭`);
        });
    },

    initializeExpress: (app) => {
        // (optional) auth module
        app.use(auth.prefix, auth.routes());

        // (optional) client playground
        app.use("/playground", playground);

        // (optional) web monitoring panel
        app.use("/colyseus", monitor());

        app.use(
            "/",
            serveIndex(path.join(__dirname, "static"), { icons: true })
        );
        app.use("/", express.static(path.join(__dirname, "static")));
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    },
});
