const socket = io();

socket.on("connect", () => {
    console.log("connected to server");
});

socket.on("UPDATE_MESSAGES", (msg, allMsgs) => {
   allMsgs.sort((a,b) => a.dateCompare - b.dateCompare)
   allMsgs.forEach(msg => appendMsg(msg));
   });

socket.on("NEW_MESSAGE", (msg) => {
    appendMsg(msg);
});

function appendMsg(msg) {
    document.getElementById("posts").innerHTML += `
        <div class="post ui card">
            <div class="content">
                <b>${msg.usr} (${msg.id}):</b>
                ${msg.msg}
                <hr/>
                <button class="ui red button">
                    <i class="heart icon"></i>
                </button>
            </div>
        </div>`

}

function sendMsg() {
    const usr = document.getElementById("usr").value;
    const msg = document.getElementById("msg").value;

    socket.emit("POST_MSG", {usr, msg});
}