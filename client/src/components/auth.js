class Auth {
  constructor() {
    this.authenticated = false;
    this.route = { route: "/" };
  }

  async login({ username, password }) {
    try {
      const data = { username: username, password: password };
      let response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let jsonData = await response.json();
      if (jsonData.success === true) {
        this.authenticated = true;
        localStorage.setItem("authorization", "Bearer " + jsonData.token);
        return this.authenticated;
      } else {
        console.log(jsonData.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  logout() {
    this.authenticated = false;
  }

  setRoute(route) {
    this.route = { ...route };
  }

  getRoute() {
    return this.route;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
