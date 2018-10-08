import React, { Component, Fragment } from "react";

export default class TodoList extends Component {
  state = {
    todos: [],
    editing: null,
  };

  addTodoItem = (event) => {
    event.preventDefault();

    let text = this.refs.name.value;
    let completed = this.refs.completed.value ? true : false;
    let date = Date.now();
    let editing = false;

    let todo = {
      text: text,
      id: date,
      completed: completed,
      editing: editing,
    };

    let todos = this.state.todos;

    todos.push(todo);
    
    this.setState({
      id: 0,
    });

  }

  delete = id => {
    const { todos } = this.state;
    let newTodos = todos.findIndex(function (todo) {
      return todo.id === id;
    });

    todos.splice(newTodos, 1);

    this.setState({
      todosClone: todos,
      todos: todos
    });
  };

  edit = id => {
    const { todos } = this.state;
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.editing = !todo.editing;
      }
    });
    this.setState({ todos });
  };

  update = (id, e) => {
    const { todos } = this.state;
    const inputValue = new FormData(e.target).get("text");
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.text = inputValue;
        todo.editing = false;
      }
    });

    this.setState({ todos });
  };

  showAll = () => {
    const todosClone = this.state.todosClone;
    todosClone.forEach(todo => {
      return todosClone;
    });

    this.setState({ todos: todosClone });
  };

  showCompleted = () => {
    const todosClone = this.state.todosClone;
    const newTodos = todosClone.filter(todo => todo.completed === true);
    this.setState({ todos: newTodos });
  };

  showNotCompleted = () => {
    const todosClone = this.state.todosClone;
    const newTodos = todosClone.filter(todo => todo.completed === false);
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;
    const Editing = ({ id, value }) => (
      <form onSubmit={e => this.update(id, e)}>
        <input type="text" defaultValue={value} name="text" />
      </form>
    );
    const Item = ({ text: value, id, completed }) => (
      <li key={id}>
        {completed ? <span role="img" aria-label="Check">✔️</span> : <span role="img" aria-label="Cross">❌</span>}
        {value}
        &nbsp; &nbsp;
        <button onClick={() => this.delete(id)}><span role="img" aria-label="Junk">🗑️</span></button>
        &nbsp;
        <button onClick={() => this.edit(id)}><span role="img" aria-label="Edit">✏️</span></button>
      </li>
    );

    return (
      <Fragment>
        <form onSubmit>
          <input type="text" ref="name" placeholder="What's on your mind?"/>
          &nbsp;
          <input type="completed" ref="completed" placeholder="Empty = false"/>
          &nbsp;
          <button onClick={this.addTodoItem}>Add Item</button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map(todo => (
            <div>
              {todo.editing ? (
                <Editing value={todo.text} id={todo.id} />
              ) : (
                <Item {...todo} />
              )}
            </div>
          ))}
        </ul>

        <button onClick={this.showCompleted}>Show completed</button>&nbsp;
        <button onClick={this.showNotCompleted}>Show not completed</button>&nbsp;
        <button onClick={this.showAll}>All</button>

      </Fragment>
    );
  }
}
