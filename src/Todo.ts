interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const todosEl = document.querySelector<HTMLUListElement>("#todos")!;





const START_ARRAY = [
    { id: 1, title: "🤓 Learn about TypeScript", completed: true },
    { id: 2, title: "😇 Take over the world", completed: false },
    { id: 3, title: "💰 Profit", completed: false },
    { id: 4, title: "😈 Be nice", completed: true },
]

const jsonTodos = localStorage.getItem("todos");
// let todos: Todo[] = jsonTodos && jsonTodos !== "[]" ?
//  JSON.parse( jsonTodos ) 
//  : START_ARRAY;

    let todos: Todo[] = jsonTodos ? JSON.parse(jsonTodos) : []

 const saveTodos = () => {
    const jsonTodos = JSON.stringify(todos)
    localStorage.setItem("todos",jsonTodos)
 }
 const toggleTodo = (id:number) => {
    todos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)

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
            return `<li>
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
            </li>`
        }).join("")
       
}

renderTodos()