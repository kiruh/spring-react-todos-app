import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import "./TodoRow.css";

class TodoRow extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onToggleCompleted = this.onToggleCompleted.bind(this);
  }

  onRemove() {
    const { todo } = this.props;
    this.props.onRemove(todo);
  }

  onToggleCompleted() {
    const { todo } = this.props;
    const updated = {
      ...todo,
      completed: !todo.completed
    };
    this.props.onChange(updated);
  }

  render() {
    const { todo } = this.props;
    const { completed, content } = todo;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div
          className="custom-control custom-checkbox"
          onClick={this.onToggleCompleted}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            checked={completed}
            onChange={this.onToggleCompleted}
          />
          <label className="custom-control-label">{content}</label>
        </div>

        <button
          className="btn btn-delete-todo btn-light btn-sm"
          onClick={this.onRemove}
        >
          <FaTimes />
        </button>
      </div>
    );
  }
}

TodoRow.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default TodoRow;
