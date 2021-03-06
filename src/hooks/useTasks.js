const FIREBASE_URL = `https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app`;
let SET_TASKS;
let SET_ERROR;
let AUTH_DETAILS;

export default function useTasks(setTasks, setError, authDetails) {
    
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

function getTasks(onLoadCallback) {

    function onSuccess(data) {

        const arr = [];

        if(data) {
            for(const [id, obj] of Object.entries(data)) {
                arr.push({
                    ...obj,
                    id: id
                })
            }
        }

        SET_TASKS(arr);
        onLoadCallback?.();
    }

    function onError(error) {
        console.log("GET TASKS", error)
    }

    tasksHttp({
        path: `/tasks/${AUTH_DETAILS.userId}.json`,
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
        path: `/tasks/${AUTH_DETAILS.userId}.json`,
        method: "POST",
        body: taskObj,
        successCallback: onSuccess,
        errorCallback: onError
    })

}

function updateTaskStatus(tasks, taskId, taskStatus) {
    taskThinking(tasks, taskId)

    function onSuccess(data) {
        const tasksCopy = [...tasks];
        const active_task_index = tasksCopy.findIndex(task => task.id === taskId);
        tasksCopy[active_task_index].status = taskStatus;
        tasksCopy[active_task_index].thinking = false;
        SET_TASKS(tasksCopy);
    }

    function onError(error) {
        console.log("COMPLETE TASK", error)
    }

    tasksHttp({
        path: `/tasks/${AUTH_DETAILS.userId}/${taskId}/.json`,
        method: "PATCH",
        body: {status: taskStatus},
        successCallback: onSuccess,
        errorCallback: onError
    })
}

function deleteTask(tasks, taskId) {
    taskThinking(tasks, taskId)

    function onSuccess(data) {
        const tasksCopy = [...tasks];
        const new_tasks = tasksCopy.filter(task => task.id !== taskId);
        SET_TASKS(new_tasks);
    }

    function onError(error) {
        console.log("DELETE TASK", error)
    }


    tasksHttp({
        path: `/tasks/${AUTH_DETAILS.userId}/${taskId}.json`,
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
    .then(data => {
        if(data && data.error) {
            SET_ERROR(data.error);
            return;
        } else {
            SET_ERROR(null);
            successCallback(data)
        }

    })
    .catch(error => {
        SET_ERROR(error)
        errorCallback(error)
    })

}

function taskThinking(tasks, taskId) {
    const tasksCopy = [...tasks];
    const active_task_index = tasksCopy.findIndex(task => task.id === taskId);
    tasksCopy[active_task_index].thinking = true;
    SET_TASKS(tasksCopy);
}
