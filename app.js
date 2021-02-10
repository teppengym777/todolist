const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

(function() {

    for(var key in localStorage) {
        var html = localStorage.getItem(key);
        if(html) {
            list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    if (html) {
        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

const createTodoList = task => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${task}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

    saveTaskToLocalStorage(task, html);

}

addTask.addEventListener('submit', e => {
    e.preventDefault();

    const task = addTask.add.value.trim();
    if(task.length) {
        createTodoList(task);
        addTask.reset();
    }
});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

const filterTasks = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));


};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});