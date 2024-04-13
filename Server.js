const http = require('http');

const getRawBody = require('raw-body');

// Middleware para daatos datos codificados en la URL
//const urlencodedParser = bodyParser.urlencoded({ extended: true });


//const QuizModel = require('./Model');
//const View = require('./view');

const GeneratePDFService = require('./BackEnd/GeneratePDF_Service');
const OperationsCRUDService = require('./BackEnd/OperationsCRUD_Service');
const New_service = require('./BackEnd/new_service');

let registroInterfaz = require('./FrontEnd/registroInterfaz');
let enviarInterfaz = require('./FrontEnd/enviarInterfaz');
let homeInterfaz = require('./FrontEnd/homeInterfaz');
let loginInterfaz = require('./FrontEnd/loginInterfaz');
let verMovimientosIntervaz = require('./FrontEnd/verMovimientosIntervaz');

const MediumDB = new OperationsCRUDService();
const GeneratorPDF = new GeneratePDFService();
const NuevoObjeto = new New_service();

let UsuarioEnSesion = false;
let InicioPresentado = false;
let UsuarioInfo = null;

const PORT = 3000;

let homeInterfazInfo = ``;


const homeInterfazBase = homeInterfaz;
// Interfaz con etiquetas de bienveniada, informacion general del usuario como balance, nombre, apellido, telefono 
// y botones [action="/Enviar"], [action="/VerMovimientos"], LOGOUT  con method="POST"> 




let verMovimientosIntervazBase = verMovimientosIntervaz;
// Interfaz con cuadricula y boton para cada movimiento posible con action="/GenerarFactura" method="POST">


const getRequestBody = (req, options) => {
    return new Promise((resolve, reject) => {
        getRawBody(req, options, (err, body) => {
            if (err) {
                console.error('Error al obtener el cuerpo:', err);
                reject(err);
                return;
            }
            // Parsea el string como datos codificados en la URL
            const parsedData = new URLSearchParams(body);
            const data = {
                telefono: parsedData.get('telefono'),
                password: parsedData.get('password')
            };
            resolve(data);
        });
    });
};

const getRequestBodyFecha = (req, options) => {
    return new Promise((resolve, reject) => {
        getRawBody(req, options, (err, body) => {
            if (err) {
                console.error('Error al obtener el cuerpo:', err);
                reject(err);
                return;
            }
            // Parsea el string como datos codificados en la URL
            //const parsedData = new URLSearchParams(body);
            const data = {
                fecha: body
            };
            resolve(data);
        });
    });
};

const server = http.createServer( async (req, res) => {

    let Data = {
        telefono: '',
        password: '',
        newName: '',
        newLastname: '',
        newPassword: '',
        newTelefono: '',
        newCedula: ''
    }

    // Configura las opciones para raw-body
    const options = {
        length: req.headers['content-length'],
        limit: '1MB', // Establece el límite de tamaño del cuerpo
        encoding: 'utf8', // Establece la codificación del cuerpo
    };

    if (req.url == '/') {
        InicioPresentado = true;
        res.end(loginInterfaz); // Da la vista inicial para registrarse o iniciar sesion.

    } else if (req.url == '/Login' && InicioPresentado){ // Se usa el servicio CRUD con la opcion '1' para validar el usuario.
        // Usa raw-body para obtener el cuerpo de la solicitud
        /*getRawBody(req, options, (err, body) => {
            if (err) {
                console.error('Error al obtener el cuerpo:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
                return;
            }
            // Parsea el string como datos codificados en la URL
            const parsedData = new URLSearchParams(body)
            Data.telefono = parsedData.get('telefono');
            Data.password = parsedData.get('password');
        });*/
        const Data = await getRequestBody(req, options);

        UsuarioInfo = await MediumDB.ServicioBD(1, Data);
        if ( UsuarioInfo != false && UsuarioInfo != 'Es un usuario exitente') {
            UsuarioEnSesion = true;
            homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para el Nombre-->", UsuarioInfo[0].Name);
            homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para el Apellido-->", UsuarioInfo[0].LastName);
            homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para el Telefono-->", UsuarioInfo[0].Telefono);
            homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para el Balance-->", UsuarioInfo[0].balance);
            homeInterfazInfo = homeInterfaz;
            console.log("El usuario se valido correctamente");
            res.writeHead (302, { // 302 Indica un redireccion temporal.
                'Location': `http://localhost:${PORT}/Home` //Se le dice al recurso de la URI solicitada ha sido cambiado temporalmente. 
            });
            res.end();
        } else {
            console.log("El usuario no esta validado :( ");
            loginInterfaz = loginInterfaz; // Aqui se debe colocar un etiqueta que diga ""Las credenciales no son correctas""
            res.writeHead (302, {
                'Location': `http://localhost:${PORT}`
            });
            res.end();
        }

    } else if (req. url.startsWith('/Registrarse') && InicioPresentado) { // Se usa el servicio CRUD con la opcion '2' para insertar el usuario.
        if (req.method == 'POST'){ // Manejo POST del Registro
            res.end(registroInterfaz); 
        } else if (req.method == 'GET'){ // Manejo GET del registro

        let stringURL = req.url.slice(13);
        // Parsea el string como datos codificados en la URL
        const parsedData = new URLSearchParams(stringURL)
        Data.newName = parsedData.get('newName');
        Data.newLastname = parsedData.get('newLastname');
        Data.newPassword = parsedData.get('newPassword');
        Data.newTelefono = parsedData.get('numeroCuenta');
        Data.telefono = parsedData.get('numeroCuenta');
        Data.newCedula = parsedData.get('cedula');

        let usuarioExistente = await MediumDB.ServicioBD(1, Data); // Valida si ya existe un usuario con la Opcion 1
        if ( usuarioExistente == 'Es un usuario exitente' || usuarioExistente != false) {
            registroInterfaz = registroInterfaz.replace("<!-- Etiqueta para el Usuario existente-->", "El usuario ya existe");
            res.end(`
            <html>
                <body>
                    <form id="redirectForm" method="POST" action="/Registrarse">
                    </form>
                    <script>
                        // Envía automáticamente el formulario al cargar la página
                        document.getElementById('redirectForm').submit();
                    </script>
                </body>
            </html>
            `);

        } else {
            const insercionCorrecta = await MediumDB.ServicioBD(2, Data); // Inserta el usuario con la opcion 2
            if ( insercionCorrecta.acknowledged ){ 
                console.log("se inserto un user chidoris");
                loginInterfaz = loginInterfaz; // Aqui se debe colocar un etiqueta que diga ""Se creo un usuario correctamente""
            } else {
                console.log("El usuario no se pudo insertar :( ")
                loginInterfaz = loginInterfaz; // Aqui se debe colocar un etiqueta que diga ""No se pudo crear el usuario intentelo de nuevo mas tarde""
            }
        }
        res.writeHead (302, {
            'Location': `http://localhost:${PORT}`
        });
        res.end();
        }

    } else if (req.url.startsWith('/Enviar') && UsuarioEnSesion) { // Se usa el servicio CRUD con la opcion '3' para actualizar los balances e insertar un movimiento.
        if (req.method == 'POST'){ // Manejo POST del Enviar
            res.end(enviarInterfaz);
        } else if (req.method == 'GET'){ // Manejo GET del Enviar
            let stringURL = req.url.slice(7);
            // Parsea el string como datos codificados en la URL
            const parsedData = new URLSearchParams(stringURL)
            Data.origen = UsuarioInfo[0].Telefono;
            Data.destino = parsedData.get('destino');
            Data.cantidad = parsedData.get('cantidad');
            
            const EstadoEnvio = await MediumDB.ServicioBD(3, Data);
            if ( EstadoEnvio == true ){// Se realiza envío de dinero y se registra un movimiento
                // Se cambia el balance en las interfaces y se añade la etiqueta correspondiente.
                homeInterfaz = homeInterfaz.replace(UsuarioInfo[0].balance, UsuarioInfo[0].balance - Data.cantidad);
                homeInterfazInfo = homeInterfazInfo.replace(UsuarioInfo[0].balance, UsuarioInfo[0].balance - Data.cantidad);
                UsuarioInfo[0].balance = UsuarioInfo[0].balance - Data.cantidad;
                homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para envio satisfactorio-->", "Se realizo el envio satisfactoriamente");
            } else if ( EstadoEnvio == 'No le alcanza SAPOHPPOBRE' ){
                homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para envio satisfactorio-->", "El monto supera tu saldo actual");
            }else {
                homeInterfaz = homeInterfaz.replace("<!-- Etiqueta para envio satisfactorio-->", "No se completo el envio, revisa la informacion de este.");
            }

            res.writeHead (302, {
                'Location': `http://localhost:${PORT}/Home`
            });
            res.end();
        }

    } else if (req.url == '/VerMovimientos' && UsuarioEnSesion) { // Se usa el servicio CRUD con la opcion '5' para buscar los movimientos.
        verMovimientosIntervaz = verMovimientosIntervazBase;
        let tablaHTML = ``;
        Data.telefono = UsuarioInfo[0].Telefono;
        // Llamada a la función ConsultarFactura para obtener los datos
        const Movimientos = await MediumDB.ServicioBD(5, Data);

        tablaHTML = `
        <tr>
        <th>Fecha</th>
        <th>Origen</th>
        <th>Destino</th>
        <th>Valor</th>
        <th>Punto</th>

            <div class="form-group">
                </tr>
                ${Movimientos.map((Movimiento) => `
                <tr>
                    <td>${Movimiento.fecha}</td>
                    <td>${Movimiento.origen}</td>
                    <td>${Movimiento.destino}</td>
                    <td>${Movimiento.valor}</td>
                    <td>${Movimiento.punto}</td>
                    <td>
                        <form action="/GenerarFactura" method="POST">
                            <input type="hidden" name="fecha" value="${Movimiento.fecha}">
                            <button type="submit" id="loginButton">Generar factura</button>
                        </form>
                        
                    </td>
                </tr>
            </div>
        `).join('')}
        `;
                            /*<form action="/manager/eliminar" method="post">
                    <input type="hidden" name="usuario" value="${Movimientos[0].destino}">
                    <button type="submit">Eliminar</button>
                    </form>
                    <form id="generarFactura" action="/GenerarFactura" method="POST">
                    <button type="submit">Generar Factura</button>
                    </form>
                    */

        verMovimientosIntervaz = verMovimientosIntervaz.replace("<!-- Los datos de los usuarios se llenarán desde la función de JavaScript -->", tablaHTML);
        if ( Movimientos ){
            console.log("Se extrayeron los movimientos");
        } else {
            console.log("NO  se extrayeron los movimientos :( ")
        }
        res.end(verMovimientosIntervaz);

    } else if (req.url == '/GenerarFactura' && UsuarioEnSesion && req.method == 'POST') { // Se buscan los movimientos y se genera PDF con el servicio GeneratePDF.
        const Data = await getRequestBodyFecha(req, options);
        //Data.fecha = Data.fecha["Symbol(context)"].target["Symbol(query)"]
        //Data.fecha["Symbol(context)"].target["Symbol(query)"][1]
        Data.telefono = UsuarioInfo[0].Telefono;
        Data.fecha = Data.fecha.slice(6);
        Data.fecha = Data.fecha.replace(/\+/g, ' ');
        Data.fecha = Data.fecha.replace(/%3A/g, ':');
        Data.fecha = Data.fecha.replace(/%28/g, '(');
        Data.fecha = Data.fecha.replace(/%29/g, ')');
        Data.fecha = Data.fecha.replace(/%C3%A1/g, 'á');
        // Llamada a la función ConsultarFactura para obtener los datos
        await GeneratorPDF.GeneratePDF(6, Data);
        /*if ( RutaPDF == String){
            verMovimientosIntervaz = verMovimientosIntervaz.replace("<!-- Etiqueta para Ruta de PDF -->", 'La factura se generó en la ruta: ' + RutaPDF);
        }*/

        res.end(verMovimientosIntervaz);

    } else if (req.url == '/Home' && UsuarioEnSesion) { // Se usa el arreglo UsuarioInfo para mostrar la informacion obtenida.
        let interfaz = homeInterfaz;
        homeInterfaz = homeInterfazInfo;// Esto es para blanquear las etiquetas de esta interfaz.
        res.end(interfaz); // Aqui se  debe construir un html 'home' con la informacion del arreglo 'UsuarioInfo' para luego enviarlo al explorador.

    } else if (req.url == '/nuevoservicio'){
        const result = await NuevoObjeto.ConsultarRestaurantes();
        let jsonResult = JSON.stringify(result);
        res.end(jsonResult)
    } else if (req.url != '/favicon.ico') {
        homeInterfaz = homeInterfazBase;
        UsuarioEnSesion = false;
        res.writeHead (302, {
            'Location': `http://localhost:${PORT}`
        });
        res.end();
    } 
    });

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

let Mock = {
    newName: "Darius", 
    newLastname: "Noxus", 
    newPassword: "236523", 
    newtelefono: "3208112609", 
    newCedula: "5585885641",
    telefono: "3208112607",
    password: "123",
    origen: "3208112607",
    destino: "3208112608",
    cantidad: "500",
    fecha: "2023-11-11 - 12:31:02"
}
