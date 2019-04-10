const responseEl = document.getElementById("response");
const questionEl = document.getElementById("question");

const socket = io();
socket.on("question", question => {
    questionEl.innerText = question;
})

function submit(){
    const response = responseEl.value;
    socket.emit("response", response);
}