import { todoService } from "../../services/todo.service.js"

const { createStore, compose } = Redux
//TODOS
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

//LOADER
export const SET_IS_LOADING = 'SET_IS_LOADING'

//PERCENT
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'

//MAXPAGE
export const SET_MAX_PAGE = 'SET_MAX_PAGE'

//FILTER
export const SET_FILTER='SET_FILTER'

//UNDO TODOS
export const UNDO_TODOS = 'UNDO_TODOS'



const initialState = {
  todos: [],
  isLoading: false,
  doneTodosPercent: 0,
  maxPage: 0,
  filterBy:todoService.getDefaultFilter(),
 // lastTodos:[] ----OPTIMISTIC WAY TO SAVE LAST TODOS AND RENDER THEM IF FAIL
}

export function todoReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //TODOS
    case SET_TODOS:
      return {
        ...state,
        todos: cmd.todos,
      }

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== cmd.todoId),
        // todos:[...state.todos] OPTIMISTIC

      }

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, cmd.todo],
      }

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (todo._id === cmd.todo._id ? cmd.todo : todo)),
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading,
      }
    case SET_DONE_TODOS_PERCENT:
      return {
        ...state,
        doneTodosPercent: cmd.doneTodosPercent,
      }

    case SET_MAX_PAGE:
      return { ...state, maxPage: cmd.maxPage }

      case SET_FILTER:
        return {...state,filterBy:{...state.filterBy,...cmd.filterBy}}

      // case UNDO_TODOS:
      //   return {...state, 
      //     todos:[...state.lastTodos] OPTIMISTIC
      //   }
  }

  return state
}
