import jwtDecode from "jwt-decode";

export default class JWTManager {
  static getTokenExpirationDate() {
    const token = localStorage.getItem("jwt-token");

    // in case token doesnt exist.
    if (token == null) return null;

    const decoded = jwtDecode(token);
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

  static storeToken(token) {
    localStorage.setItem("jwt-token", token);
  }

  static deleteToken() {
    localStorage.removeItem("jwt-token");
  }
}
