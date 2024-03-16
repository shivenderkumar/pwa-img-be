const logger = require("../middlewares/logger.js");
const ApiError = require("./apiError.js");
class Response {
	constructor(res, success, err, message, data) {
		var out = {
			success: success,
		};
		if (success) {
			out.message = message;
			if (data) out.data = data;
			res.status(200).send(out);
			return;
		}

		if (err instanceof ApiError) {
			out.message = err.message;
			res.status(err.code).send(out);
			return;
		}

		res.status(500).send("Server error");
	}

	static error(res, err) {
		return new Response(res, false, err);
	}
	static success(res, data, message) {
		return new Response(res, true, null, data, message);
	}
}

module.exports = Response;