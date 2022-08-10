const socket = io();

socket.on("connect", ()=> {
    console.log('conexion etablecida')
});

socket.on("UPDATE_MESSAGES", (msg, messages) => {
    document.getElementById("posts").innerHTML = "";
    messages.forEach(msg => {
        document.getElementById("posts").innerHTML += `
            <div class="post">
                <div class="post-header">
                    <div class="post-header-left">
                        <img src="${msg.avatar}" alt="${msg.name}">
                    </div>
                    <div class="post-header-right">
                        <h3>${msg.name}</h3>    
                        <p>${msg.date}</p>
                    </div>
                </div>
                <div class="post-body">

                    <p>${msg.message}</p>
                </div>
                <div class="post-footer">
                    <div class="post-footer-left">
                        <i class="fas fa-heart"></i>
                        <span>${msg.likes}</span>
                    </div>
                    <div class="post-footer-right">
                        <i class="fas fa-comment"></i>
                        <span>${msg.comments.length}</span>
                    </div>
                </div>
            </div>
        `;
    }
    );
}
);

//     console.log(msg);
//     console.log(messages);
// } );

// socket.on("UPDATE_MESSAGES", (msg, allMessages) => {
//     document.getElementById("posts").innerHTML = "";
//     for (let msg of allMessages) {
//         appendMsg(msg);
//     }
// });

socket.on("NEW_MESSAGE", (msg) => {
    appendMsg(msg);
});

function appendMsg(msg){
    document.getElementById("posts").innerHTML += `
    <div class="post ui card">
        <div class="content">
            <b>${msg.usr}: (${msg.socket_id}): </b> ${msg.msg}
            <hr/>
            <button class= "ui button">
                <i class= "heart icon"></i>
            </button>
        </div>
    </div>` 
}

function sendMsg(){
    const usr = document.getElementById("usr").value;
    const msg = document.getElementById("msg").value;

    socket.emit("POST_MESSAGE", {usr, msg});

}