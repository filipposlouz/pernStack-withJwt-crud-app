class Auth {
  constructor() {
    this.authenticated = false;
    this.route = { route: "/" };
  }

  async login({ username, password }) {
    try {
      let response = await fetch("http://localhost:5000/authenticateduser");
      let jsonData = await response.json();
      if (
        username === jsonData[0].username &&
        password === jsonData[0].userpassword
      ) {
        this.authenticated = true;
        return this.authenticated;
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
