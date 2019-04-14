const express = require('express');
const app = express();
const path = require("path");
const server = require('http').Server(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname,"..","public"),{extensions: ['html']}));



let activeRooms = ["0"];
let rooms = Array(10000);
rooms[0] = {question: "What up?" , owner:"loser"};

io.on("connection", socket => {
    socket.on("create", question => {
        let roomID = "0";
        while(activeRooms.includes(roomID)){
            roomID = (Math.floor(Math.random()*10000)).toString().padStart(4,0);
        }
        rooms[parseInt(roomID)] = {question: question, owner: socket};
        activeRooms.push(roomID);
        socket.emit("creationConfirm", roomID);
        socket.on("disconnect", () => {
            activeRooms.splice(activeRooms.indexOf(roomID),1);
        })
    })
    socket.on("join", roomID => {
        if(activeRooms.includes(roomID)){
            socket.join("rm"+roomID);
            const question = rooms[parseInt(roomID)].question;
            socket.emit("question", question);
            socket.on("response", response => {
                rooms[parseInt(roomID)].owner.emit("response", response);
            })   
        }else{
            socket.disconnect();
        }
    })
})

const port = process.env.PORT || 3010;
server.listen(port, () => {
    console.log("server started on port "+port);
})