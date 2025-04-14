import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { changeBalance } from '../store/actions/user.actions.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
  //   const [todos, setTodos] = useState(null) FROM THIS
  const todos = useSelector(storeState => storeState.todos) // TO THIS
  const isLoading = useSelector(storeState => storeState.isLoading)
  const dispatch = useDispatch()

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {
    setSearchParams(filterBy)
    loadTodos(filterBy).catch(() => {
      showErrorMsg('Cannnot load Todos')
    })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    const isSureDelete = confirm('Are you sure')
    if (!isSureDelete) return

    removeTodo(todoId).catch(() => {
      showErrorMsg('cannot remove todo')
    })
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    saveTodo(todoToSave)
      .then(() => {
        showSuccessMsg(`Updated successfully`)
        if (todoToSave.isDone) {
            return changeBalance(10)
        }
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Couldnt Update todo')
      })
  }

  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      {isLoading ? (
        <h1 className="loader">Loading ...</h1>
      ) : (
        <section>
          <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
          <hr />
          <h2>Todos Table</h2>
          <div style={{ width: '60%', margin: 'auto' }}>
            <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
          </div>
        </section>
      )}
    </section>
  )
}
