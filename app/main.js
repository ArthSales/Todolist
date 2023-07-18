const form = document.getElementById("newItem");
const list = document.getElementById("todolist");
const itens = JSON.parse(localStorage.getItem("itens")) || []

console.log(itens);

itens.forEach( (element) => {
    createElement(element, itens.indexOf(element));
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const task = evento.target.elements['task'];

    const item = task.value;

    itens.push(item);
    createElement(item, itens.indexOf(item));

    localStorage.setItem("itens", JSON.stringify(itens));

    
})


function createElement(task, id) {
    const newItem = document.createElement('li');
    newItem.innerHTML += `⟡ ${task}`;
    newItem.dataset.id = id;
    completeTaskButton(newItem);

    list.appendChild(newItem);
}

// ✓

function completeTaskButton(parent) {

    const completeTaskButton = document.createElement("button");
    completeTaskButton.innerHTML += "✓";
    completeTaskButton.classList.add("deleteButton");

    parent.appendChild(completeTaskButton);

    completeTaskButton.addEventListener("click", () => {
        deleteTask(completeTaskButton.parentNode,parent.dataset);
    })
}


function deleteTask(element,id) {
    element.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);
    
    localStorage.setItem("itens", JSON.stringify(itens));
}