const questionEl = document.getElementById("question");
const cardsEl = document.getElementById("cards");
const buttonEl = document.getElementById("hostButton");
const roomEl = document.getElementById("roomID");

const socket = io();

function host(){
    socket.emit("create", questionEl.value);
    socket.on("creationConfirm", roomID => {
        roomEl.innerHTML = "Room: <b>"+ roomID + "</b>";
        buttonEl.classList.add("d-none");
        socket.on("response", response => {
            createNewCard(response);
        })
    })
}

function createNewCard(text){
    let card = document.createElement("div");
    card.classList.add("card","conor-card");
    let p = document.createElement("o");
    p.innerText = text;
    card.appendChild(p);
    cardsEl.appendChild(card);
}