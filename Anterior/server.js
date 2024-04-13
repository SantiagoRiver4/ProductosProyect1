const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://gdiazahir:Cypher3331@cluster01.nsgrv8o.mongodb.net";
const client = new MongoClient(uri);
var ManagerInterfazConTabla = ``

const loginInterfaz = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CRUD</title>
    <style>
        /* Estilos CSS  */
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(45deg, #06b6d4, #1fbe22cf);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
    
        .container {
            width: 300px;
            padding: 40px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.5); /* Borde neón verde */
            border: 2px solid #007427; /* Borde azul neon suave */
            
        }
    
        .form-group {
            margin-bottom: 20px;
        }
    
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
    
        .form-group input {
            width: 90%;
            padding: 10px;
            border-radius: 5px;
            border: 2px solid #10d406d4; /* Borde azul neon suave */
            outline: none;
            transition: border 0.3s ease;
        }
    
        .form-group input:focus {
            border: 2px solid #06b6d4; /* Borde azul neon suave al enfocar */
        }
    
        .form-group button {
            width: 100%;
            padding: 10px;
            background-color: #4caf50; /* Color de fondo verde original */
            color: #fff;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
    
        .form-group button:hover {
            background-color: #35e1ff; /* Fondo azul neon suave al pasar el cursor */
        }
    
        h1 {
            text-align: center;
            color: #25d52b; /* Cambio de color a verde más claro */
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.278); /* Borde neón verde */
        }
    
        /* Estilo personalizado para el botón "Login" */
        button {
            background-color: #25d52b; /* Fondo verde */
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            box-shadow: 0 0 10px rgba(75, 165, 75, 0.5); /* Efecto de sombra al pasar el cursor */
        }
    
        .form-group button#loginButton:hover {
            background-color: #35e1ff; /* Fondo azul neon suave al pasar el cursor */
        }
    </style>
    
</head>
<body>
    <div class="container">
        <form id="loginForm" action="/login/login" method="POST">
            <h1>Gestor de Usuarios</h1>
            <div class="form-group">
                <label for="username">Usuario:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Clave:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" id="loginButton">Login</button>
        </form>
    </div>
</body>
</html>
`;

const managerInterfaz = `<!DOCTYPE html>
<html>
<head>
    <style>
    body {
      background: linear-gradient(to right, #DC143C, #000000); /* Fondo en degradado rojo carmesí y negro onyx */
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 0;
    }
    
    .container {
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 4px rgba(100, 100, 100, 0.3);
      padding: 6px;
      text-align: center;
      max-width: 200px;
      margin: 0 auto;
    }
    
    h2 {
      color: #66cc66; /* Tono de verde más claro */
      text-shadow: 2px 2px 4px #003300; /* Borde sombreado verde oscuro */
      margin-bottom: 6px;
      font-size: 10px;
      padding: 4px;
      border: 2px solid #009922;
      border-radius: 5px;
    }
    
    form {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 6px;
    }
    
    .form-group {
      margin-bottom: 4px;
    }
    
    input {
      padding: 4px;
      width: 80%;
      border: 2px solid #cccccc;
      border-radius: 5px;
      margin-right: 4px;
      font-size: 8px;
    }
    
    button {
      background: linear-gradient(to right, #66cc66, #339933);
      color: #fff;
      padding: 4px 8px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease;
      font-size: 8px;
    }
    
    /* Estilo de la tabla */
    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 6px;
      border: 2px solid #3399ff;
      font-size: 8px;
    }
    
    th, td {
      border: 2px solid #3399ff;
      padding: 4px;
      text-align: center;
      background-color: #e6f7ff;
      color: #000;
    }
    
    th {
      background-color: #99ccff;
      font-weight: bold;
    }
    
    </style>
</head>
<body>

<h2>USUARIOS EN BASE</h2>



<br><br>


  <table id="tablaUsuarios">
      <!-- Los datos de los usuarios se llenarán desde la función de JavaScript -->
  </table>


<br>
<br><br>


  <form id="actualizacion"<input type="text" id="actualizar" action="/manager/enviar" method="POST">
      <!-- Los datos de los usuarios se actualizaran desde la función de JavaScript -->
      

  </form>


<br>

<form id="agregarFor"<input type="text" id="m" action="/manager/agregar" method="POST">
    <input type="text" id="nombre" name="nombre" required>
    <input type="text" id="apellido" name="apellido" required>
    <input type="text" id="usuario" name="usuario" required>
    <input type="text" id="contraseña" name="contraseña" required>
    <button type="submit">Agregar</button>
</form>

</body>
</html>
`

// Bandera de usuarios validados
var FlagUsuarioValidado = false;

// Se configura el middleware body-parser en una la app Express. 
// Esto se hace para que la aplicación pueda analizar datos enviados 
// en el cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(loginInterfaz);
});

app.post("/login/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    result = await MediumConBD.ValidarUser(username, password);
    if (result) {
      FlagUsuarioValidado = true;
      res.redirect("/manager");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).send("Error en el servidor");
  };
});

app.get("/manager", async (req, res) => {
  if (FlagUsuarioValidado == true) {
    try {
      const tablaHTML = await MediumConBD.MostrarManager();
       ManagerInterfazConTabla = managerInterfaz.replace("<!-- Los datos de los usuarios se llenarán desde la función de JavaScript -->", tablaHTML);

      res.send(ManagerInterfazConTabla);
    } catch (error) {
      console.error("Error al obtener los datos de la base de datos:", error);
      res.status(500).send("Error al obtener los datos de la base de datos");
    }
  } else {
    res.redirect("/");
  }
});



app.post("/manager/agregar", async (req, res) => {
  const {nombre, apellido, usuario, contraseña} = req.body;

  try {
    result = await MediumConBD.CreateUsuario(nombre, apellido, usuario, contraseña);
    if(result){
      FlagUsuarioValidado = true;
      res.redirect("/manager");
    }
    

  } catch(error){
    console.error("Error en agregar datos  a la base de datos:", error);
    res.status(500).send("Error en el servidor");
  }

  
})

app.post("/manager/eliminar", (req, res) => {
  const usuario = req.body.usuario;
  try {
    result = MediumConBD.EliminarUsuario(usuario);
    if(result){
      FlagUsuarioValidado = true;
      console.log("usuario eliminado")
      res.redirect("/manager");
    }
  }catch(error){
    res.status(500).send("Error en el servidor")
  }
  
});

app.post("/manager/actualizar", async (req, res) => { 

  try {
    const managerBoxes = `
    <input type="text" id="nuevoNombre" name="nuevoNombre" required>
    <input type="text" id="nuevoApellido" name="nuevoApellido" required>
    <input type="text" id="nuevoUsuario" name="nuevoUsuario" required>
    <input type="text" id="nuevoContraseña" name="nuevoContraseña" required>
    <button type="submit">Enviar</button>
`
    const managerInterfazActualizar = ManagerInterfazConTabla.replace("<!-- Los datos de los usuarios se actualizaran desde la función de JavaScript -->", managerBoxes);
    res.send(managerInterfazActualizar)
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).send("Error en el servidor");
  }
}
);

app.post("/manager/enviar", async (req, res) => {
try{
  const { usuario ,nuevoNombre, nuevoApellido, nuevoUsuario, nuevoContraseña } = req.body;
  const result = await MediumConBD.ActualizarUsuario(usuario, nuevoNombre, nuevoApellido, nuevoUsuario, nuevoContraseña);
    if (result) {
      res.redirect("/manager");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
} catch (error) {
  console.error("Error al actualizar usuario:", error); 
  res.status(500).send("Error en el servidor");
}
}
);

// Clase para ejecurar acciones sobre la BD
class OperacionesEnBD {
  // Contruye un documento con la BD y la colleccion
  constructor(){
    const database = client.db('CRUDWEB');
    this.document = database.collection('CRUDWEB');
  };

  // Metodo para "consultar" un usuario
  async ValidarUser(username, password){
    try{
      const query = { usuario: username, contraseña: password };
      const result = await this.document.findOne(query);

      return result;
    } catch (error) {
      console.error("Error al validar usuario:", error);
      throw error; // Propaga el error
    }
  }

  // Este metodo puede uasar para "Insertar" un nuevo usuario
  async CreateUsuario(newName, newLastname, newUsername, newPassword){
    try {
      const usuario = { nombre: newName, apellido: newLastname, usuario: newUsername, contraseña: newPassword };
      const result = await this.document.insertOne(usuario);

      return result;
    } catch (error) {
      console.error("Error al insertar usuario:", error);
      throw error; // Propaga el error
    }
  }

  // Este metodo puede uasar para "Eliminar" un nuevo usuario
  async EliminarUsuario(username) {
    try {
      const query = { usuario: username };
      const result = await this.document.deleteOne(query);

      return result;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error; // Propaga el error
    }
  }

  // Este metodo puede uasar para "actualizar" un nuevo usuario
  async ActualizarUsuario(username,newName ,newLastname ,newUsername , newPassword) {
    try {
      const filter = { user: username };
      const update = { $set: { nombre: newName, apellido: newLastname, usuario: newUsername,password: newPassword} };
      const result = await this.document.updateOne(filter, update);

      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error; // Propaga el error
    }
  }
  async MostrarManager() {
    try {
      const query = {}; // Consulta vacía para obtener todos los documentos
      const result = await this.document.find(query).toArray();
  
      // Genera la tabla HTML con los datos de la base de datos
      const tablaHTML = `
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th></th>
        </tr>
        ${result.map((usuario) => `
          <tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.contraseña}</td>
            <td>
                 <form action="/manager/eliminar" method="post">
                 <input type="hidden" name="usuario" value="${usuario.usuario}">
                  <button type="submit">Eliminar</button>
                 </form>
                 <form id="actualizarForm" action="/manager/actualizar" method="POST">
                  <button type="submit">Actualizar</button>
                 </form>
            </td>
          </tr>
        `).join('')}
      `;
  
      // Devuelve la tabla HTML completa
      return tablaHTML;
    } catch (error) {
      console.error("Error al mostrar los datos:", error);
      throw error; // Propaga el error
    }
  } 
  
  
};

// Aqui se conecta al cluster de mongo y luego inica nuestro servidor
async function InicarServer() {
  try {
    await client.connect();
    console.log("Conexión a MongoDB establecida");
    // Hecha la conexion, crea un objeto de la clase OperacionesEnBD()
    // para hacer el CRUD en la BD
    MediumConBD = new OperacionesEnBD();
    
    // Inicia el servidor con la app de Express
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};


// Llama la ejecucion inicial del sv.
InicarServer();


{/* <form id="actualizarForm" action="/manager/actualizar" method="POST">
    <div class="form-group">
        <label for="usuario">Usuario a actualizar:</label>
        <input type="text" id="usuario" name="usuario" required>
    </div>
    <div class="form-group">
        <label for="nuevaContraseña">Nueva Contraseña:</label>
        <input type="password" id="nuevaContraseña" name="nuevaContraseña" required>
    </div>
    <button type="submit">Actualizar Usuario</button>
</form> */}
