class ApiError extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.message = message;
	}

	static badRequest(msg) {
		return new ApiError(400, msg);
	}

	static alreadyExists(msg) {
		return new ApiError(409, msg || "Report already exists");
	}

	static notActive(msg) {
		return new ApiError(401, msg || "Report not active");
	}

	static notFound(msg) {
		return new ApiError(404, msg || "Data not found");
	}

	static internal(err, msg) {
		return new ApiError(500, msg || "Server error : " + err.message);
	}
}

module.exports = ApiError;