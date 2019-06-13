import axios from "axios";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import TodoRow from "./TodoRow";

axios.defaults.baseURL = "http://127.0.0.1:8080";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: null,
      newContent: ""
    };
    this.onNewContentChange = this.onNewContentChange.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
    this.onChangeTodo = this.onChangeTodo.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  async onRemoveTodo(todo) {
    try {
      await axios.delete(`/api/todos/${todo.id}/`);
      const { todos } = this.state;
      const updated = todos.filter(item => item.id !== todo.id);
      this.setState({
        todos: updated
      });
    } catch (error) {
      console.error(error);
    }
  }

  async onChangeTodo(todo) {
    try {
      const response = await axios.put(`/api/todos/${todo.id}/`, todo);
      const { data } = response;

      const { todos } = this.state;
      const updated = todos.filter(item => item.id !== todo.id);
      updated.push(data);

      this.setState({
        todos: updated
      });
    } catch (error) {
      console.error(error);
    }
  }

  async onAddTodo(event) {
    event.preventDefault();

    const { newContent, todos } = this.state;
    try {
      const response = await axios.post("/api/todos/", {
        content: newContent,
        completed: false
      });
      const { data } = response;
      const updated = [...todos, data];
      this.setState({
        todos: updated,
        newContent: ""
      });
    } catch (error) {
      console.error(error);
    }
  }

  onNewContentChange(event) {
    const { value } = event.target;
    this.setState({
      newContent: value
    });
  }

  async componentDidMount() {
    const response = await axios.get("/api/todos/");
    const { data } = response;
    this.setState({
      loading: false,
      todos: data
    });
  }

  renderRows() {
    const { todos } = this.state;
    if (!todos.length) return null;

    let rows = todos
      .sort((a, b) => b.id - a.id)
      .map(todo => {
        return (
          <li key={todo.id} className="list-group-item">
            <TodoRow
              todo={todo}
              onChange={this.onChangeTodo}
              onRemove={this.onRemoveTodo}
            />
          </li>
        );
      });

    return (
      <section className="main">
        <ul className="list-group">{rows}</ul>
      </section>
    );
  }

  render() {
    const { loading, newContent } = this.state;
    if (loading) return null;

    return (
      <section className="container">
        <h1 className="mt-4 mb-2">Todos</h1>
        <form onSubmit={this.onAddTodo}>
          <input
            className="form-control mb-4"
            placeholder="What needs to be done?"
            autoFocus
            value={newContent}
            onChange={this.onNewContentChange}
          />
        </form>
        {this.renderRows()}
      </section>
    );
  }
}

export default App;
