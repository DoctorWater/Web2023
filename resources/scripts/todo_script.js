document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let clone = document.querySelector('#template').content.cloneNode(true);
    if (taskInput.value.trim() !== '') {
        const newTask = clone.querySelector('li');
        const newTaskText = clone.querySelector('li > p');
        newTaskText.textContent = taskInput.value;
        
        const removeButton = clone.querySelector('li > button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            removeTask(newTask);
        };

        console.log("New task text:" + newTaskText.textContent)

        taskList.appendChild(newTask);

        saveTasks();

        taskInput.value = '';
    }
}

function removeTask(task) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(task);

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    var tasks = new Array();

    const liElements = taskList.getElementsByTagName('li');

    for (let i = 0; i < liElements.length; i++) {
        var text = liElements[i].getElementsByTagName('p')[0];
        tasks.push(text.innerHTML);
    }
    var debug = JSON.stringify(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        taskList.innerHTML = '';

        const tasks = JSON.parse(storedTasks);

        tasks.forEach(task => {
            let clone = document.querySelector('#template').content.cloneNode(true);
           
            const newTask = clone.querySelector('li');
            const newTaskText = clone.querySelector('li > p');
            newTaskText.textContent = task;
            
            const removeButton = clone.querySelector('li > button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                removeTask(newTask);
            };
    
            console.log("New task text:" + newTaskText.textContent)
    
            taskList.appendChild(newTask);
    
    
            taskInput.value = '';
            
        })
    }
}
