let homeInterfaz = `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>

    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to right, #1a1a1a, #000);
            color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        #homeInterfaz {
            width: 100%;
            max-width: 800px;
            padding: 60px;
            background: linear-gradient(to right, #222, #111);
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
            text-align: center;
            overflow: hidden;
            position: relative;
        }

        h1 {
            color: #ff9900;
            text-shadow: 0 0 10px #ff9900, 0 0 20px #ff9900;
            margin-bottom: 20px;
        }

        p {
            margin: 20px 0;
        }

        #imageContainer {
            margin-top: -60px; /* Ajuste de la posición de la imagen */
            position: relative;
        }

        img {
            width: 120px;
            height: 120px;
            border-radius: 70%;
            border: 2px solid #fff;
            margin-top: 10px; /* Espacio superior para separar la imagen del texto */
        }

        /* Botones y formulario */
        #buttonContainer {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        button {
            flex: 1;
            background: linear-gradient(to right, #ffcc66, #ff9900);
            color: #1a1a1a;
            padding: 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            margin: 10px;
        }

        button:hover {
            background: linear-gradient(to right, #ff9900, #ffcc66);
        }

        /* Efecto de neón en el borde */
        #homeInterfaz::before {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(to right, #ff9900, #ffcc66);
            z-index: -1;
            border-radius: 15px;
            opacity: 0.8;
            animation: neon-glow 1.5s infinite alternate;
        }

        @keyframes neon-glow {
            from {
                opacity: 0.8;
            }

            to {
                opacity: 0.4;
            }
        }
    </style>
</head>
<body>

    <div id="homeInterfaz">
        <!-- Etiquetas de bienvenida, información general del usuario, etc. -->
        <div id="imageContainer">
            <img src="file:///C:/Users/SANTY/OneDrive/Imágenes/Capturas%20de%20pantalla/Captura%20de%20pantalla%202023-11-17%20105443.png" alt="Usuario">
        </div>
        <h1>Bienvenido</h1>
        <p>Nombre: <!-- Etiqueta para el Nombre--></p>
        <p>Apellido: <!-- Etiqueta para el Apellido--></p>
        <p>Telefono: <!-- Etiqueta para el Telefono--></p>
        <p>Balance: $<!-- Etiqueta para el Balance--></p>

        <!-- Botones y formulario -->
        <form action="/Enviar" method="POST">
            <button type="submit">Enviar</button>
        </form>

        <form action="/VerMovimientos" method="POST">
            <button type="submit">Ver Movimientos</button>
        </form>
        <h3><!-- Etiqueta para envio satisfactorio--></h3>
        <form action="/Logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    </div>

</body>
</html>
`

module.exports = homeInterfaz;