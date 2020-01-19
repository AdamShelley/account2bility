import React, { useState } from "react";

import UserTodo from "./UserTodo";
import "./UserList.css";
import Modal from "../../Shared/Components/UIElements/Modal";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import NewGoal from "./NewGoal";

const UserList = props => {
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddHandler = () => setShowAddModal(true);
  const closeAddHandler = () => setShowAddModal(false);

  const { sendRequest, isLoading } = useHttpClient();

  const responseHandler = async (goalId, response) => {
    console.log(`Request to ${response} goal`);

    // Fetch the route to request accept goal

    try {
      await sendRequest(
        `http://localhost:3000/api/v1/actions/`,
        "POST",
        JSON.stringify({
          userId: props.userId,
          action: response,
          todoId: goalId
        }),
        {
          "Content-Type": "application/json"
        }
      );

      // props.pending(goalId);

      // Delete the todo buttons from the list

      console.log("Done");
    } catch (err) {
      console.log(err);
    }
  };

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
          <NewGoal
            userId={props.userId}
            closeModal={closeAddHandler}
            updateHandler={props.update}
          />
        </div>
      </Modal>

      <div className="userlist-container">
        <Card className="usergoals">
          <h2> {props.username}'s actions...</h2>
          <ul className="userlist__list">
            {props.actions.data.map((todo, index) => {
              return (
                <UserTodo
                  number={index + 1}
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  creatorId={todo.creator}
                  status={todo.status}
                  responseHandler={responseHandler}
                  addedClass={todo.status ? "goal-pending" : null}
                />
              );
            })}
          </ul>
          <Button onClick={openAddHandler} addedClass="button-add">
            ADD
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserList;
