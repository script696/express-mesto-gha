class NotFoundError extends Error {
  constructor() {
    super();
    this.message = "Данные не найдены";
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;