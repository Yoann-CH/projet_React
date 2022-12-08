const url = "http://localhost:5000/users";

export const getallUsers = () => {
    return fetch(url).then((response) => response.json());
}