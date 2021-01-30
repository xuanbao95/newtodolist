function getEle(id) {
    return document.getElementById(id);
};
function getAllTask() {
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "get",
    });
    promise.then(function (result) {
        var arrTodo = [];
        var arrDone = [];
        for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].status) {
                arrDone.push(result.data[i]);
            } else {
                arrTodo.push(result.data[i]);
            }
        };
        renderTodo(arrTodo);
        renderDone(arrDone);
        console.log(result.data);
    })
    promise.catch(function (erro) {
        console.log(erro);
    })
};
getAllTask();

function addTask(task) {
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "post",
        data: task,
    });
    promise.then(function (result) {
        getAllTask();
        console.log(result.data);
    }).catch(function (erro) {
        console.log(erro);
    })
};
getEle("addItem").addEventListener("click", function () {
    var taskName = getEle("newTask").value;
    var objeckData = { taskName: taskName };
    addTask(objeckData);
});
//check
window.checkDone = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "put",
    })
    promise.then(function () {
        getAllTask();
        console.log(getAllTask);
    }).catch(function (erro) {
        console.log(erro);
    })
};

window.delTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "delete",
    })
    promise.then(function () {
        getAllTask();
        console.log(getAllTask);
    }).catch(function (erro) {
        console.log(erro);
    })
};
window.rejeckTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "put",
    })
    promise.then(function () {
        getAllTask();
        console.log(getAllTask);
    }).catch(function (erro) {
        console.log(erro);
    })
};


function renderTodo(arrTodo) {
    var contentTodo = "<ul>";
    for (var i = 0; i < arrTodo.length; i++) {
        contentTodo += `
        <li>
        <span>${arrTodo[i].taskName}</span>
        <div class="text-right">
          <span onclick="delTask('${arrTodo[i].taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-trash"></i
          ></span>
          <span onclick="checkDone('${arrTodo[i].taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-check"></i
          ></span>
        </div>
      </li>
        `
        contentTodo += `</ul>`;
    };
    getEle("todo").innerHTML = contentTodo;
};
function renderDone(arrDone) {
    var contentDone = "<ul>";
    for (var i = 0; i < arrDone.length; i++) {
        contentDone += `
        <li>
        <span>${arrDone[i].taskName}</span>
        <div class="text-right">
          <span onclick="delTask('${arrDone[i].taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-trash"></i
          ></span>
          <span onclick="rejeckTask('${arrDone[i].taskName}')" class="buttons" style="cursor: pointer"
            ><i class="fa fa-undo"></i
          ></span>
        </div>
      </li>
        `
        contentDone += `</ul>`;
    };
    getEle("completed").innerHTML = contentDone;
};
