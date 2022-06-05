// import WebSocket from "ws";
import WebSocket, { WebSocketServer } from "ws";
import queryString from "query-string";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dummyMessages = [{
    message: "There is only one way left to escape the alienation of present day society: to retreat ahead of it.",
    nickname: "Roland Barthes",
    email: "rb@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "I despise all adjectives that try to describe people as liberal of conservative, rightist or leftist, as long as they stay in the useful part of the road.",
    nickname: "Dwight David Eisenhower",
    email: "ddeisenhower@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: `I will age ungracefully until I become an old woman in a small garden, doing whatever the hell I want.
    `,
    nickname: "Hosokawa Tadaoki",
    email: "ht@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "The Way of Tea lies in studying the ceremony, in understanding the principles, and in grasping the reality of things. These are its three rules",
    nickname: "",
    email: "@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "Glory is like a circle in the water, Which never ceaseth to enlarge itself, Till by broad spreading it disperse to nought.    ",
    nickname: "William Shakespeare",
    email: "ws@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "ZEUS, n. The chief of Grecian gods, adored by the Romans as Jupiter and by the modern Americans as God, Gold, Mob and Dog.",
    nickname: "Robin Chotzinoff",
    email: "pm@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "Are we going to be a services power? The double-cheeseburger-hold-the-mayo kings of the world?",
    nickname: "Lee Iacocca",
    email: "lee@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}, {
    message: "As long as I don't write about the government, religion, politics, and other institutions, I am free to print anything.",
    nickname: "Pierre Augustin",
    email: "pa@connect.ust.hk",
    imagepath: "a0b43be0b988a47093dd0adb650403ef",
}]

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
                const parsedMessage = JSON.parse(message);
                console.log(getRandomInt(0, dummyMessages.length - 1));
                websocketConnection.send(JSON.stringify(dummyMessages[getRandomInt(0, dummyMessages.length - 1)]));
            });
        }
    );

    return websocketServer;
};