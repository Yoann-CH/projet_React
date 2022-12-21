const API_URL = "http://fauques.freeboxos.fr:3000";

class AuthService {

    login(username, password) {
      return fetch(API_URL + "/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then(res => res.json())
        .then()
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(username, password) {
      return fetch(API_URL + "/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then()
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
export default new AuthService();