import io from "socket.io-client";
const SOCKET_URL = 'http://localhost:4000';

export const socket = io(SOCKET_URL, {
    autoConnect: false
  });
//why is this not working?