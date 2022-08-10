const socket = io();

socket.on("connect", () => {
    console.log("connected to server");
});

socket.on("UPDATE_MESSAGES", (msg, allMsgs) => {
    document.getElementById("posts").innerHTML += '';
    for (let msg of allMsgs) {
        appendMsg(msg);
    }
});

socket.on("NEW_MESSAGE", (msg) => {
    appendMsg(msg);
});

function appendMsg(msg) {
    document.getElementById("posts").innerHTML += `
        <div class="post ui card">
            <div class="div ui conatiner">
                <b>${msg.usr} (${msg.id}):</b>
                </hr>
                ${msg.msg}
            </div>
        </div>`

}

function sendMsg() {
    const usr = document.getElementById("usr").value;
    const msg = document.getElementById("msg").value;

    socket.emit("POST_MSG", {usr, msg});
}