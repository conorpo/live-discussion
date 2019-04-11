const responseEl = document.getElementById("response");
const questionEl = document.getElementById("question");
const buttonEl = document.getElementById("submit");

const socket = io();

function deparam(uri){
    if(uri === undefined){
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
        function($0, $1, $2, $3) {
        	queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
      );
    return queryString;
};

const params = deparam(window.location.search);

socket.emit("join", params.rm);

let ready = false;
socket.on("question", question => {
    buttonEl.classList.remove("disabled");
    ready = true;
    questionEl.innerText = question;
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