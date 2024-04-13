const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

const OperationsCRUDService = require('./OperationsCRUD_Service');

async function GeneratePDF(Mock){
    try {
        const MediumDB = new OperationsCRUDService()
        // Llamada a la función ConsultarFactura para obtener los datos
        const data = await MediumDB.ServicioBD(6, Mock);
        // Generar el PDF con los datos obtenidos
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream((path.join(__dirname, 'pdfs', 'factura.pdf')));

        // Manejar eventos
        writeStream.on('finish', () => {
            console.log('Archivo PDF creado correctamente.');
        });

        writeStream.on('error', (err) => {
            console.error('Error al crear el archivo PDF:', err);
        });

        doc.pipe(writeStream);

        // Aquí puedes agregar el contenido del PDF utilizando doc, por ejemplo:
        doc.fontSize(12);
        doc.text('Factura', { align: 'center' });
        doc.text('----------------------------------------');
        doc.text('Datos del cliente:');
        doc.text(`Número de cuenta: ${data.numeroCuenta}`);
        // Agregar más información según los datos obtenidos...

        doc.end();
        console.log('PDF generado exitosamente: factura.pdf');
    } catch (error) {
        console.error('Error al generar la factura:', error);
    }
}

let Mock = {
    ObjetId: "654fba566f888f9ccf011094",
    telefono: "3205770999",
    fecha: "2023-11-11 - 12:31:02"
};

GeneratePDF(Mock);