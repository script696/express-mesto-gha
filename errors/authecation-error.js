class AuthecationError extends Error {
  constructor() {
    super();
    this.message = "Недостаточно прав";
    this.statusCode = 401;
  }
}

module.exports = AuthecationError;