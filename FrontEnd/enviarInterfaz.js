let enviarInterfaz = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Envío</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000000; /* Negro */
            font-family: 'Arial', sans-serif;
            color: white;
            text-align: center;
        }

        h1 {
            margin-top: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 165, 0, 0.5); /* Borde sombreado amarillo-naranja */
        }

        label {
            margin-top: 10px;
            font-size: 18px;
        }

        input {
            padding: 10px;
            margin-top: 5px;
            border: none;
            border-radius: 5px;
            width: 300px;
            box-sizing: border-box;
        }

        button {
            padding: 10px;
            margin-top: 20px;
            font-size: 16px;
            text-align: center;
            background-color: #ffa500; /* Amarillo naranja */
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <h1>Formulario de Envío</h1>

    <form action="/Enviar" method="GET">

        <label for="destino">Destino:</label>
        <input type="text" id="destino" name="destino" required>

        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" name="cantidad" min="1" required>

        <button type="submit">Enviar</button>
    </form>

</body>
</html>
`
// Interfaz con formulario de origen, destino y cantidad con action="/enviar" method="GET">


module.exports = enviarInterfaz;