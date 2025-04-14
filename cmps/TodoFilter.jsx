const { useState, useEffect } = React

import { utilService } from '../services/util.service.js'
const { useRef } = React

export function TodoFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter)).current

  useEffect(() => {
    // Notify parent
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { txt, importance, status } = filterByToEdit
  return (
    <section className="todo-filter">
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input value={txt} onChange={handleChange} type="search" placeholder="By Txt" id="txt" name="txt" />
        <label htmlFor="importance">Importance: </label>

        <input
          value={importance}
          onChange={handleChange}
          type="number"
          placeholder="By Importance"
          id="importance"
          name="importance"
        />

        <select name="status" id="status" value={status} onChange={handleChange}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>

        <button hidden>Set Filter</button>
      </form>
    </section>
  )
}
