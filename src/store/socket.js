// src/websocket.js  

import { updateFromWebSocket } from "./matchSlice";

let socket;  
export const initiateSocket = (dispatch) => {  
    socket = new WebSocket("ws://127.0.0.1:9990");  

    socket.onopen = () => {  
        console.log('WebSocket Connected');  
    };  

    socket.onmessage = event => {  
        const message = JSON.parse(event.data);          
        dispatch(updateFromWebSocket(message));  
    };  

    socket.onclose = event => {  
        console.log('WebSocket Disconnected');  
        socket = null;  
    };  

    socket.onerror = error => {  
        console.error('WebSocket Error: ', error);  
    };  
};  

export const disconnectSocket = () => {  
    if(socket) {  
        socket.close();  
    }  
};  

export const sendMessage = (message) => {  
    if (socket) {  
        socket.send(JSON.stringify(message));  
    }  
};