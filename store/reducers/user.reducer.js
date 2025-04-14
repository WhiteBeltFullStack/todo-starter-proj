import { userService } from '../services/user.service.js'
const { createStore, compose } = Redux

//USER
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
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

