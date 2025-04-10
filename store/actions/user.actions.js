import { userService } from '../../services/user.service.js'
import { SET_USER, store } from '../store.js'

export function login(credentials) {
  return userService
    .login(credentials)
    .then(user => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch(err => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then(user => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch(err => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch(err => {
      console.log('user actions -> Cannot logout', err)
      throw err
    })
}
