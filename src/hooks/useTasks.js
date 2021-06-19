const FIREBASE_URL = `https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app`;
let SET_TASKS;
let SET_ERROR;
let AUTH_DETAILS;

export default (setTasks, setError, authDetails) => {
    
    SET_TASKS = setTasks;
    SET_ERROR = setError;
    AUTH_DETAILS = authDetails;

    return {
        getTasks,
        addTask,
        updateTaskStatus,
        deleteTask,
    }

}

function getTasks() {

    function onSuccess(data) {

        const arr = [];

        for(const [id, obj] of Object.entries(data)) {
            arr.push({
                ...obj,
                id: id
            })
        }

        SET_TASKS(arr);
    }

    function onError(error) {
        console.log("GET TASKS", error)
    }

    tasksHttp({
        path: `/tasks.json`,
        params: [`orderBy="userId"`, `equalTo="${AUTH_DETAILS.userId}"`],
        method: "GET",
        successCallback: onSuccess,
        errorCallback: onError
    })

}

function addTask(taskObj) {

    function onSuccess(data) {
        SET_TASKS((prevState) => (
            [...prevState, {
                ...taskObj,
                id: data.name
            }]
        ))
    }

    function onError(error) {
        console.log("ADD TASK", error)
    }

    tasksHttp({
        path: `/tasks.json`,
        method: "POST",
        body: taskObj,
        successCallback: onSuccess,
        errorCallback: onError
    })

}

function updateTaskStatus(tasks, taskId, taskStatus) {

    function onSuccess(data) {
        const tasksCopy = [...tasks];
        const active_task_index = tasksCopy.findIndex(task => task.id === taskId);
        tasksCopy[active_task_index].status = taskStatus;
        SET_TASKS(tasksCopy);
    }

    function onError(error) {
        console.log("COMPLETE TASK", error)
    }

    tasksHttp({
        path: `/tasks/${taskId}/.json`,
        method: "PATCH",
        body: {status: taskStatus},
        successCallback: onSuccess,
        errorCallback: onError
    })
}

function deleteTask(tasks, taskId) {

    function onSuccess(data) {
        const tasksCopy = [...tasks];
        const new_tasks = tasksCopy.filter(task => task.id !== taskId);
        SET_TASKS(new_tasks);
    }

    function onError(error) {
        console.log("DELETE TASK", error)
    }


    tasksHttp({
        path: `/tasks/${taskId}.json`,
        method: "DELETE",
        successCallback: onSuccess,
        errorCallback: onError
    })
}


function tasksHttp({
    path,
    params,
    method: taskMethod,
    body: taskBody,
    successCallback,
    errorCallback
}) {

    const queryParams = `?auth=${AUTH_DETAILS.token}${params ? ("&" + params.join("&")) : ""}`

    fetch(`${FIREBASE_URL}${path}${queryParams}`,
        {
            method: taskMethod,
            body: (taskBody ? JSON.stringify(taskBody) : null),
        }
    )
    .then(response => response.json())
    .then(data => successCallback(data))
    .catch(error => errorCallback(error))

}