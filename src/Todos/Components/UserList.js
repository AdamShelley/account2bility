import React, { useState } from "react";

import UserTodo from "./UserTodo";
import "./UserList.css";
import Modal from "../../Shared/Components/UIElements/Modal";
import Card from "../../Shared/Components/UIElements/Card";
import NewGoal from "./NewGoal";

const UserList = props => {
  const [showAddModal, setShowAddModal] = useState(false);
  const username = props.username;

  const openAddHandler = () => setShowAddModal(true);
  const closeAddHandler = () => setShowAddModal(false);

  return (
    <React.Fragment>
      <Modal
        show={showAddModal}
        onCancel={closeAddHandler}
        header={`Add a new goal`}
        contentClass="goal-item__modal-content"
        footerClass="goal-item__modal-actions"
        className="modal-addgoal"
        // footer={<button onClick={closeAddHandler}>Add goal</button>}
      >
        <div className="addgoal-container">
          <h2>Add Goal Here</h2>
          <NewGoal closeModal={closeAddHandler} />
        </div>
      </Modal>

      <div className="userlist-container">
        <Card>
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
        </Card>
        <button onClick={openAddHandler} className="button button-add">
          ADD
        </button>
      </div>
    </React.Fragment>
  );
};

export default UserList;
