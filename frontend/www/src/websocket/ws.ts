import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names]
}

const nameInChat = uniqueNamesGenerator(config); 

let socket: WebSocket = undefined
let interval: NodeJS.Timeout = undefined



function handleMessage(message: string) {
    console.log("message received:", message)
}

export function connectToWebsocket() {
    if (socket) {
        socket.close()
    }
    console.log(`connecting to web socket as ${nameInChat}`)
    const protocol = isCurrentWebsiteUsingSSL() ? "wss:" : "ws:"
    const baseUrl = buildURL(protocol)
    const url = `${baseUrl}/api/ws/${nameInChat}`
    socket = new WebSocket(url)
    socket.onopen = function (e) {
        console.log("[open] Socket Connection established", url.substring(0, 20) + "...")
    }
    socket.onmessage = function(event) {
        handleMessage(event.data)
    }
    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Device Connection closed cleanly, code=${event.code} reason=${event.reason}`)
        } else {
            console.log('[close] Connection died')
        }
    }
    socket.onerror = (event: Event) =>  {
        console.log("[error]", event)
    }
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => check(), 5000)
}
function check() {
    if (socket) {
        switch (socket.readyState) {
            case WebSocket.CONNECTING:
                console.log("state: connecting", socket)
                break;
            case WebSocket.OPEN:
                console.log("websocket ok", socket)
                break;
            case WebSocket.CLOSING:
                console.log("closing", socket)
                break;
            case WebSocket.CLOSED:
                console.log("socket is closed, connecting...")
                connectToWebsocket()
                break;
        }
    } else {
        connectToWebsocket()
    }
}
export function isCurrentWebsiteUsingSSL() {
    const u = window.location
    return u.protocol.startsWith("https")
}
export function buildURL(protocol?: string) {
    const u = window.location
    let port = ""
    switch(u.port) {
        case "443":
            break;
        case "80":
            break;
        default:
            port = u.port ? ":" + u.port : ""
    }
    const proto = protocol ? protocol : u.protocol
    const url = proto + "//" + u.hostname + port
    return url
}