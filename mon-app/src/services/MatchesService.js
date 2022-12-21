const API_URL = "http://fauques.freeboxos.fr:3000/matches";

class MatchesService {
    getAllMatches(token) {
        return fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
          }).then(res => res.json())
          .then()
      }
}

export default new MatchesService();