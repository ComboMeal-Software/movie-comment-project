const taskListId = 'task-list';
const taskTextId = 'task-text';
const submitBtnId = 'submit-btn';
const URL = '/tasks';
window.onload = () => getAllTasks();
document.getElementById(submitBtnId).addEventListener('click', () => {
        const taskTextNode = document.getElementById(taskTextId);
        postNewTask(taskTextNode);
    }
)

function getAllTasks() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                printResponse(xmlHttp.responseText);
            } else {
                console.log(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.open('GET', URL, true);
    xmlHttp.send(null);
}

function postNewTask(taskTextNode) {
    const taskText = taskTextNode.value;
    if (taskText.trim().length === 0) return;
    taskTextNode.value = '';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                getAllTasks();
            } else {
                console.log(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.open('POST', URL, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    let body = JSON.stringify({"name": taskText});
    xmlHttp.send(body);
}

function deleteTask(taskId) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                getAllTasks();
            } else {
                console.log(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.open('DELETE', URL, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    let body = JSON.stringify({"_id": taskId});
    xmlHttp.send(body);
}

function getReady() {
    const response = document.getElementById(taskListId);
    if (response != null) response.innerHTML = '';
}

function printResponse(responseText) {
    getReady();
    const taskList = document.getElementById(taskListId);
    const jsonData = JSON.parse(responseText);
    for (let i = 0; i < jsonData.length; i++) {
        (function () {
            const task = jsonData[i];
            const taskName = task['name'];
            const taskId = task['_id'];
            const taskLi = createLiNode(taskId, taskName);
            taskList.appendChild(taskLi);
        }());
    }
}

function createLiNode(taskId, taskName) {
    const taskLi = document.createElement('li');
    taskLi.className = 'task-item';
    const statusInput = createStatusInput(taskId, taskName);
    taskLi.appendChild(statusInput);
    const statusIcon = createStatusIcon(taskId);
    taskLi.appendChild(statusIcon);
    const text = createTextNode(taskId, taskName);
    taskLi.appendChild(text);
    return taskLi;
}

function createStatusInput(taskId, taskName) {
    const statusInput = document.createElement('input');
    statusInput.className = 'task-item__status-input';
    statusInput.type = 'checkbox';
    statusInput.id = taskId;
    statusInput.name = taskId;
    statusInput.value = taskName;
    statusInput.addEventListener('click',
        function() { deleteTask(taskId); });

    return statusInput;
}

function createStatusIcon(taskId) {
    const statusIcon = document.createElement('label');
    statusIcon.className = 'task-item__status-icon';
    statusIcon.htmlFor = taskId;
    return statusIcon;
}

function createTextNode(taskId, taskName) {
    const text = document.createElement('label');
    text.className = 'task-item__text';
    text.htmlFor = taskId;
    text.innerHTML = taskName;
    return text;
}
