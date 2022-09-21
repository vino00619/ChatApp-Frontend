import React from "react";
import {io} from "socket.io-client"

const SOCKET_URL = "https://chatapp-main.herokuapp.com";
export const socket = io(SOCKET_URL);
export const AppContext = React.createContext();