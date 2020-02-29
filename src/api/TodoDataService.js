import axios from 'axios';

class TodoDataService {

    getAllTodos(username) {
        return axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    deleteTodoBy(username, id) {
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    getTodoBy(username, id) {
        return axios.get(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo) {
        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`, todo);
    }

    saveTodo(username, todo) {
        return axios.post(`http://localhost:8080/users/${username}/todos`, todo);
    }

}

export default new TodoDataService();