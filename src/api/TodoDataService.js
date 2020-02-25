import axios from 'axios';

class TodoDataService {

    getAllTodos(username) {
        return axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    deleteTodoBy(username, id) {
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }

}

export default new TodoDataService();