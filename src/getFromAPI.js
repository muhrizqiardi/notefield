import axios from 'axios'

export const getFromAPI = (API_URL) => {
    let res = [];
    axios.get(API_URL)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            console.log(error)
            return null;
        });
    return res;
};
