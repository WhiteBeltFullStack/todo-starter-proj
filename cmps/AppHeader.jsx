const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
const { useSelector } = ReactRedux

export function AppHeader() {
  const navigate = useNavigate()
  //   const [user, setUser] = useState(userService.getLoggedinUser())
  const todos = useSelector(storeState => storeState.todos)
  const user = useSelector(storeState => storeState.loggedInUser)
  const doneTodoPercent = useSelector(storeState => storeState.doneTodosPercent)

  function onLogout() {
    logout()
      .then(() => {
        showErrorMsg('Logged Out')
      })
      .catch(err => {
        showErrorMsg('Oops Failed to Logout')
      })
  }

  function getStylePrefs() {
    const prefs = {
      color: '',
      backgroundColor: '',
    }
    if (user && user.pref) {
      prefs.color = user.pref.color, 
      prefs.backgroundColor = user.pref.bgColor
    }
    return prefs
  }

  //   function onSetUser(user) {
  //     setUser(user)
  //     navigate('/')
  //   }
  const formatedPercent = todos ? doneTodoPercent.toFixed(2) + '%' : null

  return (
    <header style={getStylePrefs()} className="app-header full main-layout">
      <section className="header-container">
        <h1>React Todo App</h1>
        {!user ? (
          <span className="log-progress">Log in to see the progress</span>
        ) : (
          <section className="progress-bar">
            <span>Done : {formatedPercent} </span>
          </section>
        )}
        {user ? (
          <section>
            <span>Balance :{user.balance} </span>
            <Link to={`/user`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup />
            {/* <LoginSignup onSetUser={onSetUser} /> */}
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
