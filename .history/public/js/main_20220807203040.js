const socket = io();

socket.on("connect", ()=> {
    console.log('conexion etablecida')
});

socket.on("INIT", (msj) => {
    alert(msg);
});