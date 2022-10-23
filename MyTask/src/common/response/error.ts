export default class ApiError extends Error {
  status;
  message;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string = "Bad Request") {
    return new ApiError(400, message);
  }

  static serverConflict(message: string = "Server Conflict") {
    return new ApiError(409, message);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message: string = "Forbidden") {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
