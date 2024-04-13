const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

const OperationsCRUDService = require('./OperationsCRUD_Service');

class GeneratePDFService{
    async GeneratePDF(opcion, Data){
        try {
            const MediumDB = new OperationsCRUDService()
            // Llamada a la función ConsultarFactura para obtener los datos
            const data = await MediumDB.ServicioBD(opcion, Data);
            // Generar el PDF con los datos obtenidos
            const doc = new PDFDocument();
            const now = new Date();
            const fechaHora = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_'); // Formatea la fecha y la hora
            const writeStream = fs.createWriteStream((path.join(__dirname, 'pdfs', `factura${fechaHora}.pdf`)));
    
            // Manejar eventos
            writeStream.on('finish', () => {
                console.log('Archivo PDF creado correctamente.');
            });
    
            writeStream.on('error', (err) => {
                console.error('Error al crear el archivo PDF:', err);
            });
    
            doc.pipe(writeStream);
    
           // Estilos
            const estilos = {
                titulo: { align: 'center', fontSize: 24, bold: true, margin: [0, 10], color: 'black', font: 'Helvetica-Bold' },
                subtitulo: { align: 'left', fontSize: 16, bold: true, margin: [0, 10], color: 'black', font: 'Helvetica-Bold' },
                dato: { align: 'left', fontSize: 14, margin: [0, 5], color: 'black', font: 'Helvetica' },
                lineaSeparadora: { margin: [0, 10], color: 'black' },
            };
    
            // Agregar la imagen de la empresa CashHive centrada
            const imagePath = "C:\\Users\\SANTY\\OneDrive\\Imágenes\\Capturas de pantalla\\Captura de pantalla 2023-11-17 105443.png";
            if (fs.existsSync(imagePath)) {
                const imageWidth = 200;
                const imageX = (doc.page.width - imageWidth) / 2;
                doc.image(imagePath, imageX, doc.y, { width: imageWidth })
                    .moveDown(1); // Moverse hacia abajo para dejar espacio después de la imagen
            } else {
                console.error("La ruta de la imagen no es válida:", imagePath);
            }
    
            // Título de la factura
            doc.text('FACTURA', { ...estilos.titulo, align: 'center' });
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
    
            // Información del cliente
            doc.text('Datos del cliente:', estilos.subtitulo).moveDown(0.5);
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
    
            doc.text(`Nombre: ${data[0][0].Name} ${data[0][0].LastName}`, estilos.dato).moveDown(0.5);
            doc.text(`Cédula: ${data[0][0].Cedula}`, estilos.dato).moveDown(0.5);
            doc.text(`Teléfono: ${data[0][0].Telefono}`, estilos.dato).moveDown(0.5);
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
    
            // Detalles de la factura
            doc.text('Detalles de la factura:', estilos.subtitulo).moveDown(0.5);
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
            doc.text(`Fecha: ${data[1].fecha}`, estilos.dato).moveDown(0.5);
            doc.text(`Referencia: ${data[1]._id}`, estilos.dato).moveDown(0.5);
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
    
            // Detalles del movimiento
            doc.text('Valor Movimiento:', estilos.subtitulo).moveDown(0.5);
    
            // Línea separadora
            doc.lineJoin('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke(estilos.lineaSeparadora.color)
                .moveDown(0.5); // Moverse hacia abajo después de la línea separadora
    
            // Total
            doc.text(`Total: ${data[1].valor}`, estilos.dato).moveDown(0.5);
    
            // Agregar más información según los datos obtenidos...
    
            // Finalizar el documento
            doc.end();
            console.log('PDF generado exitosamente: factura.pdf');
        } catch (error) {
            console.error('Error al generar la factura:', error);
        }
    };
};

let Mock = {
    ObjetId: "654fba566f888f9ccf011094",
    telefono: "3205770999",
    fecha: "2023-11-11 - 12:31:02"
};

//GeneratePDFService.GeneratePDF(Mock);

module.exports = GeneratePDFService;