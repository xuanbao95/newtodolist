function getEle(id) {
    return document.getElementById(id);
}
var validation = new Validation();
function getAllTask() {
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "get",

    });
    var arrTodo = [];
    var arrDone = [];
    promise.then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].status) {
                arrDone.push(result.data[i]);

            } else {
                arrTodo.push(result.data[i]);

            }
        };
        renderTaskTodo(arrTodo);
        renderTaskDone(arrDone);
        console.log(result.data);
    }).catch(function (erro) {
        console.log(erro);
    })

};
getAllTask();
function addTask(task) {
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

};
getEle("addItem").addEventListener("click", function () {
    //lấy dử lieuj ng dùng nhập từ ô taskName
    var taskName = document.getElementById("newTask").value;
    //tạo objeck be yêu cầu
    var objeckData = { taskName: taskName };
    var isvalid = true;
    isvalid += validation.checkEmpty(taskName, "check empty");

    //gọi hàm add task thực thi
    addTask(objeckData);
});
//check done
window.checkTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "put",
    });
    promise.then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
            getAllTask();
        };

        console.log(result.data);
    }).catch(function (erro) {
        console.log(erro);
    })
}
window.delTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "delete",
    });
    promise.then(function (result) {
        getAllTask();

        console.log(result.data);
    }).catch(function (erro) {
        console.log(erro);
    })
}
window.rejeckTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "PUT",
    });
    promise.then(function (result) {
        getAllTask();

        console.log(result.data);
    }).catch(function (erro) {
        console.log(erro);
    })
}


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
