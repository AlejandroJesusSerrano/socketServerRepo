const socket = io();

socket.om("connect", ()=> {
    console.log('conexion etablecida')
});

socket.on("INIT", (msj) => {
    alert(msg)
});