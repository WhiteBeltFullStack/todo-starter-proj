import { todoService } from '../../services/todo.service.js'
import { store } from '../store.js'

import {
  ADD_TODO,
  REMOVE_TODO,
  SET_DONE_TODOS_PERCENT,
  SET_IS_LOADING,
  SET_MAX_PAGE,
  SET_TODOS,
  UNDO_TODOS,
  UPDATE_TODO,
} from '../reducers/todo.reducer.js'

import { addActivity } from './user.actions.js'

export function loadTodos() {
  const filterBy = store.getState().todoModule.filterBy
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return todoService
    .query(filterBy)
    .then(({ maxPage, doneTodosPercent, todos }) => {
      store.dispatch({ type: SET_TODOS, todos })
      _setTodosData(maxPage, doneTodosPercent)
      return todos
    })
    .catch(err => {
      console.log('todo action -> Cannot load todos', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO
  return todoService
    .save(todo)
    .then(({ maxPage, doneTodosPercent, savedTodo }) => {
      console.log('doneTodosPercent:', doneTodosPercent)
      store.dispatch({ type, todo: savedTodo })
      _setTodosData(maxPage, doneTodosPercent)
      return savedTodo
    })
    .then(savedTodo => {
      const actionName = todo._id ? 'UPDATED' : 'ADDED'
      return addActivity(`${actionName}` + 'A Todo' + todo.txt).then(() => savedTodo)
    })
    .catch(err => {
      console.log('todo action -> Cannot save todo', err)
      throw err
    })
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(({ maxPage, doneTodosPercent }) => {
      store.dispatch({ type: REMOVE_TODO, todoId })
      _setTodosData(maxPage, doneTodosPercent)
    })
    .then(() => {
      return addActivity(`Removed` + ' A Todo' + todoId)
    })
    .catch(err => {
      console.log('todo action -> Cannot remove todo', err)
      throw err
    })
}

//OPTIMISTIC
// export function removeTodoOpt(todoId) {
//   store.dispatch({ type: REMOVE_TODO, todoId })
//   return todoService
//     .remove(todoId)
//     .then(({ maxPage, doneTodosPercent }) => {
//       _setTodosData(maxPage, doneTodosPercent)
//     })
//     .then(() => {
//       return addActivity(`Removed` + ' A Todo' + todoId)
//     })
//     .catch(err => {
//       console.log('todo action -> Cannot remove todo', err)
//       store.dispatch({type:UNDO_TODOS}) ---------->>
//       throw err
//     })
// }

function _setTodosData(maxPage, doneTodosPercent) {
  store.dispatch({
    type: SET_DONE_TODOS_PERCENT,
    doneTodosPercent,
  })
  store.dispatch({
    type: SET_MAX_PAGE,
    maxPage,
  })
}
