import React, { useState } from "react";

import UserTodo from "./UserTodo";
import "./UserList.css";
import Modal from "../../Shared/Components/UIElements/Modal";

const UserList = props => {
  const [showAddModal, setShowAddModal] = useState(false);
  const username = props.username;

  const addTodoHandler = () => {
    setShowAddModal(true);
  };
  const closeTodoHandler = () => {
    setShowAddModal(false);
  };

  return (
    <React.Fragment>
      <div className="userlist-container">
        <h2> {username}'s actions...</h2>
        <ul className="userlist__list">
          {props.todos.map((todo, index) => {
            return (
              <UserTodo
                number={index + 1}
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                creatorId={todo.creator}
                status={todo.status}
              />
            );
          })}
        </ul>
        <button onClick={addTodoHandler} className="button button-add">
          ADD
        </button>
        {showAddModal ? <Modal close={closeTodoHandler}></Modal> : null}
      </div>
    </React.Fragment>
  );
};

export default UserList;
