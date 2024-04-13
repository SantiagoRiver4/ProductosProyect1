const { Session } = require("inspector");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://riri:nomelase123456789@cluster0.yvokzqh.mongodb.net";
const client = new MongoClient(uri);
// NameCluster: riri
// PassCluester: nomelase123456789

let SessionFinally = false;
let now = new Date()

class OperacionesEnBD {d
    // Contruye un documento con la BD y la colleccion
    constructor(){
      const database = client.db('Cluster0');
      // Se consulta el documento 'users' por defecto
      this.document = database.collection('users');
      this.documentMovimientos = database.collection('movimientos');
    }

    // Metodo para Validar usuarios
    async ValidarUsuario(telefono, password){
        try{
            const query = { Telefono: telefono, pass: password };
            const result = await this.document.find(query).toArray();
            if (result.length != 0){
                console.log("Usuario Valido");
                return result;
            }

            const query2 = { Telefono: telefono};
            const result2 = await this.document.find(query2).toArray();
            if (result2.length != 0){
                return 'Es un usuario exitente';
            }

            console.log("Usuario Invalido");
            return false;
        } catch (error) {
            console.error("Error al validar usuario:", error);
            throw error; // Propaga el error
        }
    }

    // Metodo para registrar nuevos usuarios
    async CrearUsuario(newName, newLastname, newPassword, numeroCuenta, cedula){
        try {
            const usuario = { Name: newName, // String con el Nombre
                              LastName: newLastname, // String con el Apellido
                              pass: newPassword, // String con la Contraseña
                              Telefono: numeroCuenta, // String numerico con el Telefono
                              Cedula: cedula, // String numerico con la Cedula
                              balance: 0 // Balance inicial
                            };
            const result = await this.document.insertOne(usuario);
            if (result){
                console.log("Se inserto un nuevo usuario");
              }

            return result;
        } catch (error) {
            console.error("Error al insertar usuario:", error);
            throw error; // Propaga el error
        }
    }

    // Metodo para hacer transacciones tipo envío
    async EnviarDinero(origen, destino, cantidad) {
        let session;
        try {
            // Antes de hacer el UPDATE se debe validar que el valor a envíar este dentro de lo disponible de la cuenta origen
            let balanceOrigen = await this.ConsultarBalance(origen);
            if (balanceOrigen < cantidad){
                return 'No le alcanza SAPOHPPOBRE';
            }

            let balanceDestino = await this.ConsultarBalance(destino);

            if (balanceDestino === false){
                return 'Destino no existe';
            }
            let filter = { numeroCuenta: origen };
            let update = { $set: { balance : balanceOrigen - cantidad} };
            let result1 = await this.document.updateOne(filter, update); // Actualiza el balance de la cuenta Origen.
           
            filter = { numeroCuenta: destino };
            update = { $set: { balance : balanceDestino + cantidad} };
            let result2 = await this.document.updateOne(filter, update); // Actualiza el balance de la cuenta Destino.

            session = client.startSession(); // Inicia una session para transacciones en caso de falla hacer Rollback.
            session.startTransaction();

            if (result1.acknowledged && result2.acknowledged){
                this.InsertarMovimiento(origen, destino, cantidad, 'Virtual');
                await session.commitTransaction(); // Se confirman los cambios.
                return true;
            } else {
                await session.abortTransaction(); // Se hacer Rollback en caso de que una transaccion se halla completado y la otra no.
                console.log("Warning : Falló la actualizacion del balance de una o las dos cuentas : '" + origen + "' y '" + destino + "'");
                console.log("Se abortaron las transacciones.")
                return false;
            }

        } catch (error) {
            console.error("Error al actualizar los balances : ", error);
            throw error; // Propaga el error

        } finally {
            SessionFinally = true;
        }
    }

    // Metodo para insertar movimientos.
    async InsertarMovimiento(origen, destino, cantidad, punto){
        try {
            const movimiento = { fecha : now, // Fecha y hora de la transaccion
                              origen : origen, // Telefono origen
                              destino : destino, // Telefono destino
                              valor : cantidad, // Numero entero $"500" 
                              punto : punto // Puede ser "Virtual" o "Fisico"
                            };
            const result = await this.documentMovimientos.insertOne(movimiento);
    
            return result;
        } catch (error) {
            console.error("Error al insertar usuario:", error);
            throw error; // Propaga el error
        }
    }

    // Metodo para consultar el balance de la cuenta.
    async ConsultarBalance(numeroCuenta){
        try{
            const query = { Telefono: numeroCuenta };
            const result = await this.document.findOne(query);
            
            if (result == null){
                return false;
            }

            return result.balance;
        } catch (error) {
            console.error("Error al validar usuario:", error);
            throw error; // Propaga el error
        }
    }

    // Metodo para mostrar los movimoentos
    async MostrarMoviemientos(numeroCuenta) {
        try {
            let query = {origen : numeroCuenta}; // Filtra los movimoentos por el Numero Cuenta en origen
            const movimientosOrigen = await this.documentMovimientos.find(query).toArray();

            query = {destino : numeroCuenta}; // Filtra los movimoentos por el Numero Cuenta en destino
            const movimientosDestino = await this.documentMovimientos.find(query).toArray();

            let result = movimientosOrigen.concat(movimientosDestino);

            return result; //Concatena los valores devueltos y devuelve un arreglo.
        } catch (error) {
            console.error("Error al mostrar los movimientos:", error);
            throw error; // Propaga el error
        }
    } 

    // Metodo para Consultar la informacion necesario para generar un factura.
    async ConsultarFactura(fecha, numeroCuenta) {
        try {
           let query = {Telefono: numeroCuenta}; // Filtro por ObjetId
            const result1 = await this.document.find(query).toArray();
            
            query = {fecha : fecha}; // Filtro por ObjetId
            const result2 = await this.documentMovimientos.find(query).toArray();
            let result = [result1,...result2];

            return result; //Concatena los valores devueltos y devuelve un arreglo.
        } catch (error) {
            console.error("Error al mostrar los movimientos:", error);
            throw error; // Propaga el error
        }
    } 
};   

class OperationsCRUDService {
    async ServicioBD(opcion, data){
        console.log("Iniciando conexion");
        try{
            await client.connect();
            console.log("Conexion con la base de datos iniciada");
            this.MediumBD = new OperacionesEnBD();

            if (opcion == 1){
                return await this.MediumBD.ValidarUsuario(data.telefono, data.password);

            } else if (opcion == 2){
                return await this.MediumBD.CrearUsuario(data.newName, data.newLastname, data.newPassword, data.newTelefono, data.newCedula);

            } else if (opcion == 3){
                return await this.MediumBD.EnviarDinero(data.origen, data.destino, data.cantidad);

            } else if (opcion == 4){
                return await this.MediumBD.ConsultarBalance(data.telefono);

            } else if( opcion == 5){
                return await this.MediumBD.MostrarMoviemientos(data.telefono); 

            } else if (opcion == 6){
                return await this.MediumBD.ConsultarFactura(data.fecha, data.telefono);

            } else {
                return "Opcion Invalida";
            }

        } catch (error) {
            console.error("Error en ServicioBD : ", error);
            throw error; // Propaga el error
        }finally{
            if (!SessionFinally){
                await client.close();
            }
                console.log("Se cerro la conexion");
        }
    };
};

/* 

Opciones de ServicioBD
Op1 = ValidarUsuario
Op2 = CrearUsuario
Op3 = EnviarDinero
Op4 = ConsultarBalance
Op5 = MostrarMoviemientos
Op6 = ConsultarFactura

*/

// *****************************
// Mock para fines de depuracion
let data = {
    newName: "RayooFium",
    oldName: "David",
    newLastname: "Maquin",
    oldLastname: "Díaz",
    newCedula: "13654411",
    oldCedula: "1116666111",
    newTelefone: "3205770999",
    mtelefono: "3208112607",
    oldDavid: "9999999999",
    userName: "David",
    lastName: "Díaz",
    password: "123",
    telefono: "3205770999",
    cedula: "1234567890",
    ObjetId: '654fba566f888f9ccf011094',
    cantidad: "100000"
};

let opcion = 5;
//OperationsCRUDService = new OperationsCRUDService();

//console.log("Opcion : " + opcion + "\n" + OperationsCRUDService.ServicioBD(opcion, data));

module.exports = OperationsCRUDService;