// import WebSocket from "ws";
import WebSocket, { WebSocketServer } from "ws";
import queryString from "query-string";
import db from "../database.cjs";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// takes in a single argument of expressServer which
// contains the Express app instance
export default (expressServer) => {
    const websocketServer = new WebSocketServer({
        // noServer = true
        // "do not set up an HTTP server alongside this websocket server"
        noServer: true,
        // accessible by localhost:5001/websockets
        path: "/websockets",
    });

    // "upgrade" event is fired
    // whenever Express (HTTP) server receives
    // a request for an endpoing using the websocket protocol
    expressServer.on("upgrade", (request, socket, head) => {
        console.log("upgrade to ws server:D");
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit("connection", websocket, request);
        });
    });

    websocketServer.on(
        "connection",
        // websocketConnection - represents open, long-running network connection
        // connectionRequest - original request to open that connection
        function connection(websocketConnection, connectionReqeust) {
            const [_path, params] = connectionReqeust?.url?.split("?");
            const connectionParams = queryString.parse(params);
        
            console.log(connectionParams);

            websocketConnection.on("message", (message) => {
                const sql = "select * from posts inner join current_main_board on posts.parent_board_id = current_main_board.board_id where status=1";
                let messages, board_details;
                db.query(sql, function(err, data) {
                    if(err) throw err;
                    console.log("test", data);
                    const sql2 = 'SELECT * from current_main_board inner join boards on current_main_board.board_id = boards.board_id';
                    db.query(sql2, function(err2, data2) {
                        messages = data;
                        board_details = data2;
                        console.log(getRandomInt(0, messages.length - 1));
                        websocketConnection.send(JSON.stringify([messages[getRandomInt(0, messages.length - 1)], board_details]));
                    });
                });

                // const parsedMessage = JSON.parse(message);
                // console.log(getRandomInt(0, dummyMessages.length - 1));
                // websocketConnection.send(JSON.stringify(dummyMessages[getRandomInt(0, dummyMessages.length - 1)]));
            });
        }
    );

    return websocketServer;
};