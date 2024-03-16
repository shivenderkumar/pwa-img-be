const sql = require("../../../config/db");
const ApiError = require("../../../utils/apiError");
const generatePDFWithImage = require("../CreatePdf");
const Report =  require("../model/Report.model");

class ReportServices {
    async create(image_file) {
        const { destination, filename} = image_file;
        const data = { url: `${destination}${filename}` }
        const new_report = new Report(data);
        const query = "INSERT INTO reports SET ?";
        await sql.query(query, new_report);

        const report = await this.getOne(new_report.id);
        const pdf_report = await this.createPdf(report.id);
        return pdf_report;
    }

    async getOne(report_id) {
        const query = "SELECT * FROM reports WHERE id = ? AND is_deleted = 0";

        let [report, fields] = await sql.query(query, report_id);

        if (!report.length) throw ApiError.internal("Report not found");
        return report[0];
    }

    async createPdf(report_id) {
        const report = await this.getOne(report_id);
        let pdf = "";
        generatePDFWithImage(report, (pdfFilePath) => {
            console.log('PDF generated---------------:', pdfFilePath);
            pdf = pdfFilePath;
        });
        return pdf;
    }

}

module.exports = new ReportServices();