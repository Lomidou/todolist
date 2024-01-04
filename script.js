let inputBox = document.getElementById("input-box");
let taskList = document.getElementById("task-list");
let myArray = [];

function addTask() {
    if (inputBox.value === '') {
        alert('Vous devez écrire quelque chose !');
    } else {
        let li = document.createElement('li');
        li.id = "task";

        let span = document.createElement('span');
        span.innerText = "\u00d7";
        span.id = "task-span";

        li.textContent = inputBox.value;
        li.appendChild(span);

        taskList.appendChild(li);

        addTaskToArray(inputBox.value, span.id, false);
    }
    inputBox.value = '';
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        toggleTaskChecked(e.target);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateArray();
    }
}, false);

function renderTasks() {
    taskList.innerHTML = "";
    myArray.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.text;

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        span.id = task.spanId;
        li.appendChild(span);

        if (task.checked) {
            li.classList.add("checked");
        }

        taskList.appendChild(li);
    });
}

function loadData() {
    let storedData = localStorage.getItem("data");
    if (storedData) {
        myArray = JSON.parse(storedData);
        renderTasks();
    }
}

function addTaskToArray(taskText, spanId, isChecked) {
    myArray.push({
        text: taskText,
        spanId: spanId,
        checked: isChecked
    });
    save();
}

function updateArray() {
    myArray = Array.from(document.querySelectorAll("#task-list li"), li => {
        return {
            text: li.textContent.replace("×", "").trim(),
            spanId: li.querySelector("span") ? li.querySelector("span").id : null,
            checked: li.classList.contains("checked")
        };
    });
    save();
}

function toggleTaskChecked(li) {
    li.classList.toggle("checked");
    updateArray();
}

function save() {
    localStorage.setItem("data", JSON.stringify(myArray));
}

loadData();

console.log(myArray);
