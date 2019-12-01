import React from "react";

import UserTodo from "./UserTodo";
import "./UserList.css";

const UserList = props => {
  console.log(props);
  return (
    <div className="userlist-container">
      <h2>User List</h2>
      <ul className="userlist__list">
        {props.todos.map((todo, index) => {
          return (
            <UserTodo
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
    </div>
  );
};

export default UserList;
