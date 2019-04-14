const responseEl = document.getElementById("response");
const questionEl = document.getElementById("question");
const buttonEl = document.getElementById("submit");
const roomDiv = document.getElementById("roomDiv");
const responseDiv = document.getElementById("responseDiv");
const idInput = document.getElementById("idInput");

const socket = io();

function join(){
  console.log(idInput.value);
  socket.emit("join", idInput.value);
}

let ready = false;
socket.on("question", question => {
    responseDiv.classList.remove("d-none")
    buttonEl.classList.remove("disabled");
    ready = true;
    questionEl.innerText = question;
    roomDiv.classList.add("d-none");
})

function submit(){
    if(ready){
        const response = responseEl.value;
        socket.emit("response", response);
    }
    ready = false;
    buttonEl.classList.add("disabled");
    setTimeout(function(){
      ready = true;
      buttonEl.classList.remove("disabled");
    },1000*60)
}