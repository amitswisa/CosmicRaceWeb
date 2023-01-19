import jwtDecode from "jwt-decode";

export default class JWTManager {
  static getTokenExpirationDate() {
    const decoded = this.getDecypherToken();
    if (decoded == null) return null;
    return new Date(decoded.exp * 1000).getTime();
  }

  static isTokenValid() {
    const expireDate = this.getTokenExpirationDate();

    if (expireDate == null) return false;

    const currentTimestamp = new Date().getTime();
    const res = expireDate > currentTimestamp;

    if (!res) localStorage.clear();

    return res;
  }

  static getDecypherToken() {
    const token = this.getToken();

    // in case token doesnt exist.
    if (token == null) return null;

    const decoded = jwtDecode(token);
    return decoded;
  }

  static getToken() {
    return localStorage.getItem("jwt-token");
  }

  static storeToken(token) {
    localStorage.setItem("jwt-token", token);
  }

  static deleteToken() {
    localStorage.removeItem("jwt-token");
  }

  static getUsername() {
    const token = this.getDecypherToken();
    if (token == null) return token;

    return token.userName;
  }
}
