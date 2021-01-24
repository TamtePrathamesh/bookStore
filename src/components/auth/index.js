class Authentication {
  static setLogin(status) {
    localStorage.setItem("isLoggedIn", status);
  }

  static getLogin() {
    return localStorage.getItem("isLoggedIn");
  }

  static setEmail(email) {
    return localStorage.setItem("email", email);
  }

  static getEmail() {
    return localStorage.getItem("email");
  }
}

export default Authentication;
