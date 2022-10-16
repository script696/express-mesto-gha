class ConflictError extends Error {
  constructor() {
    super();
    this.message = "Данные уже существуют";
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
