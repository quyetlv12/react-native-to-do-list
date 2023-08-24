import HttpClient from "../apis/axiosClient"

export const Services = {
    getAllTodo(){
        return HttpClient.get('/tasks')
    },
    deleteTask(id){
        return HttpClient.delete(`/tasks/${id}`)
    },
    addTask(data){
        return HttpClient.post(`/tasks` , data)
    },
    savedTask(data){
        return HttpClient.post('/saved' , data)
    },
    updateTask(id , data){
        return HttpClient.put(`/tasks/${id}` , data)
    }
}