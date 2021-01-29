function getAllTask() {
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "get",
        responseType: "json",
    })
    var arrTaskDone = [];
    var arrTaskTodo = [];
    promise.then(function (result) {
        //xử lý thêm vào arrTaskTodo
        for (var index = 0; index < result.data.length; index++) {
            //lấy ra 1 task
            var task = result.data[index];
            //kiểm tra thuộc tính status của object
            if (task.status) {
                //xử lý thêm vào arrTaskDone
                arrTaskDone.push(task);

            } else {
                //xử lý thêm vào arrTaskTodo
                arrTaskTodo.push(task);
            };
        };
        //xử lý thêm vào arrTaskDone
        renderTaskDone(arrTaskDone);
        renderTaskTodo(arrTaskTodo);
        //
        console.log(arrTaskTodo);
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
};
getAllTask();
function renderTaskTodo(arrTodo) {
    var contentTodo = "";
    for (var index = 0; index < arrTodo.length; index++) {
        var task = arrTodo[index];
        contentTodo += `
        <li>
        <span>${task.taskName}</span>
            <div class="text-right">
          <span  onclick="delTask('${task.taskName}')"  class="buttons" style="cursor: pointer"
            ><i class="fa fa-trash"></i
          ></span>
          <span onclick="checkTask('${task.taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-check"></i
          ></span>
        </div>
        </li>
    `
    };
    document.getElementById("todo").innerHTML = contentTodo;
};
function renderTaskDone(arrDone) {
    var contentComplete = "";
    for (var index = 0; index < arrDone.length; index++) {
        var task = arrDone[index];
        contentComplete += `
        <li>
        <span>${task.taskName}</span>
            <div class="text-right">
          <span onclick="delTask('${task.taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-trash"></i
          ></span>
          <span onclick="rejeckTask('${task.taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-undo"></i
          ></span>
        </div>
        </li>
    `
    };
    document.getElementById("completed").innerHTML = contentComplete;
};


function addTask(task) {
    /**
     * {
  "taskName": "string"
}
     */
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "post",
        data: task,//data gửi đi phải đúng định dạng be quy định
    });
    promise.then(function (result) {
        getAllTask();
        console.log(result.data);
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
}
// định nghĩa suwh kiện click thêm task
document.getElementById("addItem").addEventListener("click", function () {
    //lấy dử lieuj ng dùng nhập từ ô taskName
    var taskName = document.getElementById("newTask").value;
    //tạo objeck be yêu cầu
    var objeckData = { taskName: taskName };
    //gọi hàm add task thực thi
    addTask(objeckData);

});
window.delTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "delete",

    })
    promise.then(function (result) {
        console.log(result.data);
        getAllTask();
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
}
window.checkTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "put",
    })
    promise.then(function (result) {
        console.log(result.data);
        getAllTask();
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
}
window.rejeckTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "put",
    })
    promise.then(function (result) {
        console.log(result.data);
        getAllTask();
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
}

