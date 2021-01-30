function ListTask() {
    this.getAllTask = function () {
        return axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "get",
        })
    };
};