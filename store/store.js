import { userService } from '../services/user.service.js'
const { createStore, compose } = Redux
//TODOS
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
//USER
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
  todos: [],
  isLoading: false,
}

function appReducer(state = initialState, cmd = {}) {
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
    //USER
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user,
      }

    case SET_USER_BALANCE:
      const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
      return {
        ...state,
        loggedInUser,
      }
  }

  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// * For Debugging
window.gStore = store
