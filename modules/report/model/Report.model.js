const { v4: uuidv4 } = require("uuid");

const Report = function (report) {
    this.id = uuidv4();
    this.title = report.title || "Some Static title";
    this.description = report.description || "Some Static description";
    this.url = report.url;
    this.created_at = new Date();
    this.modified_at = new Date();
    this.is_deleted = 0;
};

module.exports = Report;