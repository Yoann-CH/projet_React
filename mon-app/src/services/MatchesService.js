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
    
      createMatch(token) {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
        .then()
    }

    getMatch(token, id){
        return fetch(API_URL+"/"+id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
        .then()
    }

    chooseMove(token, id, turn, move){
        return fetch(API_URL+"/"+id+"/"+turn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                move: move
            })
        }).then(res => res.json())
        .then()
    }

}

export default new MatchesService();