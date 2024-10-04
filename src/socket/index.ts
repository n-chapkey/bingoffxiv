import io from 'socket.io-client';

let socket: SocketIOClient.Socket;

export const connectSocket = () => {
    if(!socket){
        socket=io();
    }
    return socket;
};