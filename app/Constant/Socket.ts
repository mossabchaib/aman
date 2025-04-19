
import { io, Socket } from "socket.io-client";
import { path } from "./path";

let socket: Socket | null = null;

export const initiateSocketConnection = (userId: any): Socket => {
  socket = io(path, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    query: {
      user_id: userId,
    },
  });

  // Set up event listeners
  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });



  // Return the socket instance
  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};
