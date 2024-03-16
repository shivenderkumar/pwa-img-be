const fs = require('fs');
const PDFDocument = require('pdfkit');

function generatePDFWithImage(report, callback) {
    const {title, url, description} = report;
    const imagePath = url
    const file_name = imagePath.substring(imagePath.lastIndexOf("/")+1, imagePath.length).split(".")[0];
    const doc = new PDFDocument();
    const pdfFilePath = `storage/pdfs/output_${file_name}.pdf`;

    doc.fontSize(20).text(title, { align: 'center' });

    const image = fs.readFileSync(imagePath);
    const imageWidth = 200; 
    const imageHeight = 150;

    doc.pipe(fs.createWriteStream(pdfFilePath));

    doc.image(image, {
        fit: [imageWidth, imageHeight],
        align: 'center',
        valign: 'center',
    });

    doc.fontSize(12).text(description, { align: 'center' });

    // Finalize the PDF and save it
    doc.end();
    callback(pdfFilePath);
}

module.exports = generatePDFWithImage