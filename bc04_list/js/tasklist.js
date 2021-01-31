function ListTask() {
    this.getAllTask = function () {
        return axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "get",
        })
    };
    this.addTask = function (task) {
        return axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "post",
            data: task,
        });
    };
    this.check = function (taskName) {
        return axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "put",
        });
    };
    this.del = function (taskName) {
        return axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "delete",
        });
    };
    this.rejeck = function (taskName) {
        return axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "put",
        });
    }
};