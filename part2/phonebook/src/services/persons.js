import axios from "axios";

const baseURL = "http://localhost:3001/persons"
const getAll = () => axios.get(baseURL).then(response => response.data)

const create = Object => axios
    .post(baseURL, Object).then(response => response.data)

const update = (id, newObject) => axios
    .put(`${baseURL}/${id}`, newObject).then(response => response.data)

const del = (id) => axios
    .delete(`${baseURL}/${id}`).then(response => response.data)
export default {getAll, create, update, del}