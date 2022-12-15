const API_URL = "http://fauques.freeboxos.fr:3000";

class AuthService {
  
    async login(username, password) {
      return await fetch(API_URL + "/login", {
          method: 'POST',
          cache: "no-cache",
          headers: {
            "Authorization": `Bearer ${username}`
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then(res => res.json())
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(username, password) {
      return fetch(API_URL + "/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then(res => localStorage.setItem("user", JSON.stringify(res)))
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
export default new AuthService();