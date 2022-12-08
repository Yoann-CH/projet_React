import axios from "axios";

const API_URL = "http://localhost:5000/";


class AuthService {
  
    login(username, password) {
      return axios
        .post(API_URL + "login", {
          username,
          password
        })
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });
    }
  
    logout(id) {
      return axios.delete(API_URL+"login/"+id)
      .then(()=>{
        localStorage.removeItem("user");
      })
    }
  
    register(username, password) {
      return axios.post(API_URL + "register", {
        username,
        password
      });
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
export default new AuthService();