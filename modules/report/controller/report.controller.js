const fs = require('fs');
const ApiError = require("../../../utils/apiError");
const Response = require("../../../utils/response");
const ReportServices = require("../services/report.services");

const createReport = async (req, res) => {
    try {
        const imageFile = req.file
        if (!imageFile) throw ApiError.notFound("Img not found!!");

        const report = await ReportServices.create(imageFile);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Report.pdf');

        const pdfStream = fs.createReadStream(report);
        pdfStream.pipe(res);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

module.exports = {
    createReport
}