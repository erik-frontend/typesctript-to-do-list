interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const todosEl = document.querySelector<HTMLUListElement>("#todos")!;
// console.log(todosEl);
const newTodoTitleEl = document.querySelector<HTMLInputElement>("#new-todo-title")!

const newTodoFormEl = document.querySelector<HTMLFormElement>("#new-todo-form")!

const START_ARRAY = [
    { id: 1, title: "🤓 Learn about TypeScript", completed: true },
    { id: 2, title: "😇 Take over the world", completed: false },
    { id: 3, title: "💰 Profit", completed: false },
    { id: 4, title: "😈 Be nice", completed: true },
]

const jsonTodos = localStorage.getItem("todos");
// console.log(jsonTodos);

let todos: Todo[] = jsonTodos && jsonTodos !== "[]" ?
    JSON.parse(jsonTodos)
    : START_ARRAY;

//  console.log(todos);

//  let todos: Todo[] = jsonTodos ? JSON.parse(jsonTodos) : []

const saveTodos = () => {
    const jsonTodos = JSON.stringify(todos)
    localStorage.setItem("todos", jsonTodos)
}


const toggleTodo = (id: number) => {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)

    saveTodos()
    renderTodos()
}
saveTodos()


/**
* Render todos to DOM
**/
// ✔ map() → делает массив - map создаёт список HTML-элементов
// ✔ join("") → делает строку - join превращает этот список в одну строку
// ✔ innerHTML её вставляет в DOM

const renderTodos = () => {
    todosEl.innerHTML = todos
        .map((todo) => {
            return `<li class="flex justify-between">
                <label>
                    <input type="checkbox"
                        ${todo.completed ? "checked" : ""}
                        data-id="${todo.id}"
                        class="toggle h-5 w-5 cursor-pointer" 
                    />
                    <span class="${todo.completed ? "line-through text-gray-400" : ""}">
                        ${todo.title}
                    </span>
                </label>
                <div class="flex items-center gap-2">
                    <button class="cursor-pointer edit px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition">
                        Edit
                    </button>
                    <button data-id="${todo.id
                }" class="cursor-pointer delete px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition">
                        Delete
                    </button>
                </div>
            </li>`
        }).join("")
    // search input type checkbox
    const toggleInputs = document.querySelectorAll<HTMLInputElement>(".toggle")
    //    console.log(toggleInputs);
    toggleInputs.forEach(input => {
        input.addEventListener("change", () => {
            const id = Number(input.dataset.id)
            toggleTodo(id)
            // console.log(id);
        })
    })

    const deleteBtn = document.querySelectorAll<HTMLButtonElement>(".delete")
    console.log(deleteBtn);
    const deleteTodo = (id:number) => {
        todos = todos.filter(todo => todo.id !== id)
        saveTodos()
        renderTodos()
    }
    deleteBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id)
            deleteTodo(id)
        })
    })
}

const newTodo = (e:SubmitEvent) => {
    e.preventDefault()
    const newTodoTitle = newTodoTitleEl.value.trim()

    if(newTodoTitle.length < 3){
        alert("That is to short todo, length must be more than 3 characters")
        return 
    }

    const maxId = Math.max(0, ...todos.map(todo => todo.id))
    todos.push({
        id:maxId + 1,
        title: newTodoTitle,
        completed: false,
    })
    saveTodos()
    renderTodos()
    newTodoTitleEl.value = ""
    console.log("Greate success", todos);
    
}
newTodoFormEl.addEventListener("submit", newTodo)
// if(todos) renderTodos()
    // else `<h2>Add something to the list</h2>`
renderTodos()