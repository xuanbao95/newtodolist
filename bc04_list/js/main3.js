function getEle(id) {
    return document.getElementById(id);
};
var getList = new ListTask();
var validation = new Validation();
function getListTask() {
    getList.getAllTask()
        .then(function (result) {
            var arrDone = [];
            var arrTodo = [];
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].status) {
                    arrDone.push(result.data[i]);
                } else {
                    arrTodo.push(result.data[i]);
                };
            };
            renderDone(arrDone);
            renderTodo(arrTodo);
            console.log(result.data);
        }).catch(function (err) {
            console.log(err);
        })
};
getListTask();
function addTask() {
    var taskName = getEle("newTask").value;
    var task = new Task(taskName);
    var isvalid = true;
    isvalid += validation.checkEmpty(taskName, "task empty");
    getList.addTask(task).then(function () {
        getListTask();
    }).catch(function (err) {
        console.log(err);
    })

};
getEle("addItem").addEventListener("click", function () {

    addTask();
});
window.checkDone = function (taskName) {
    getList.check(taskName).then(function () {
        getListTask();
    }).catch(function (err) {
        console.log(err);
    });
};
window.delTask = function (taskName) {
    getList.del(taskName).then(function () {
        getListTask();
    }).catch(function (err) {
        console.log(err);
    });
};
window.rejeckTask = function (taskName) {
    getList.rejeck(taskName).then(function () {
        getListTask();
    }).catch(function (err) {
        console.log(err);
    });
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
