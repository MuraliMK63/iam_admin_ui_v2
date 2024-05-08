import axios from "axios";

const base_url = 'http://192.168.7.146:9000/'

class ApiServiceM {

    get(path) {
        return axios.get(`${base_url}${path}`);
    }

    post(path, obj) {
        return axios.post(`${base_url}${path}`, obj);
    }

}

export default ApiServiceM