let registroInterfaz = `<style>
body {
    background: linear-gradient(45deg, black, #333);
    color: #FFD700; /* Amarillo miel */
    font-family: 'Arial', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(45deg, #333, black);
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

img {
    width: 100%; /* Hace que la imagen ocupe el 100% del ancho del contenedor */
    margin-bottom: 20px;
    border-radius: 5px;
}

label {
    display: block;
    margin-top: 10px;
    text-align: left;
}

input {
    width: calc(100% - 20px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #FFD700; /* Amarillo miel */
    border-radius: 5px;
    background: linear-gradient(45deg, #333, black);
    color: #FFD700; /* Amarillo miel */
}

button {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(45deg, #FFD700, black); /* Amarillo miel a negro */
    color: black;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(255, 215, 0, 0.8);
}

button:hover {
    background: linear-gradient(45deg, black, #FFD700); /* Negro a amarillo miel */
    color: black;
}
</style>
</head>
<body>

    <h1>Registro de Usuario</h1>

    <form action="/Registrarse" method="GET">

        <label for="newName">Nombre:</label>
        <input type="text" id="newName" name="newName" required>

        <label for="newLastname">Apellido:</label>
        <input type="text" id="newLastname" name="newLastname" required>

        <label for="newPassword">Contraseña:</label>
        <input type="password" id="newPassword" name="newPassword" required>

        <label for="numeroCuenta">Número de Cuenta:</label>
        <input type="text" id="numeroCuenta" name="numeroCuenta" required>

        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" name="cedula" required>

        <button type="submit">Registrarse</button>
    </form>
    <label for="Etiqueta"><!-- Etiqueta para el Usuario existente--></label>
</body>
</html>
`
// Interfaz  con formulario de newName, newLastname, newPassword, numeroCuenta, cedula con action="/" method="POST">

module.exports = registroInterfaz;