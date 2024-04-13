let loginInterfaz = `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>CRUD</title>
    <style>
        /* Estilos CSS  */
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(45deg, #1a1a1a, #333333);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            width: 300px;
            padding: 40px;
            background-color: #2b2b2b;
            border-radius: 10px;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
            border: 2px solid #333333;
            display: flex;
            flex-direction: column; /* Alinea los elementos en columna */
            align-items: center; /* Centra los elementos horizontalmente */
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #00ff00; /* Cambiado a verde */
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.8); /* Efecto neon para el texto */
        }

        .form-group input {
            width: 90%;
            padding: 10px;
            border-radius: 5px;
            border: 2px solid #000000; /* Color negro */
            outline: none;
            transition: border 0.3s ease;
            color: #00ff00; /* Cambiado a verde para el texto dentro del input */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.8); /* Efecto neon para el input */
        }

        .form-group input:focus {
            border: 2px solid #00ff00; /* Cambiado a verde al hacer focus */
        }

        /* Estilos modificados para los botones "Login" y "Registrarse" */
        .form-group button {
            width: 100%;
            margin-top: 10px;
            padding: 10px;
            background-color: #00ff00; /* Cambiado a verde */
            color: #000000; /* Cambiado a negro */
            border-radius: 5px;
            border: 2px solid #000000; /* Borde negro */
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.8); /* Efecto neon para el botón */
        }

        .form-group button#registerButton {
            background-color: #ffcc00; /* Color amarillo */
        }

        .form-group button:hover {
            background-color: #ffcc00; /* Color amarillo al hacer hover */
            color: #000000; /* Cambia el color del texto a negro al hacer hover */
            border-color: #000000; /* Borde negro al hacer hover */
        }

        h1 {
            text-align: center;
            color: #00ff00; /* Cambiado a verde */
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5); /* Efecto neon para el título */
        }

        /* Estilo para los botones en línea */
        .button-container {
            display: flex;
            justify-content: space-between; /* Espacio entre los botones */
            width: 100%;
        }
    </style>

</head>
<body>
    <div class="container">
        <form id="loginForm" action="/Login" method="POST">
            <h1>Gestor de Usuarios</h1>
            <div class="form-group">
                <label f 0 0 30px rgba(0, 255, 0, 0.278);
        }
    
        /* Estilo personalizado para el botón "Login" y "Registro" */
        button {
            background-color: #25d52b;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            box-shadow: 0 0 10px rgba(75, 165, 75, 0.5);
        }
    
        .form-group button#loginButton:hover, .form-group button#registerButton:hover {
            background-cor="telefono">Telefono:</label>
                <input type="text" id="telefono" name="telefono" required>
            </div>
            <div class="form-group">
                <label for="password">Clave:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="button-container">
                <button type="submit" id="loginButton">Login</button>
            </div>
        </form>
        <form action="/Registrarse" method="POST">
        <button type="submit" id="registerButton">Registrarse</button>
        </form>
    </div>
</body>
</html>
`
// Interfaz login, solo cambia css añadir boton de registro action="/Registrarse" method="POST">


module.exports = loginInterfaz;