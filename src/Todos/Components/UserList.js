import React, { useState } from "react";

import UserTodo from "./UserTodo";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
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

  const amount = props.goals.data.length;

  const responseHandler = async (goalId, response) => {
    // Fetch the route to request accept goal

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/actions/`,
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
      props.refresh();
      // Delete the todo buttons from the list
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
          {isLoading && <LoadingSpinner asOverlay />}
          <h2> {props.username}'s actions...</h2>
          <ul className="userlist__list">
            {/* {isLoading && <LoadingSpinner asOverlay />} */}
            {props.goals.data.map((todo, index) => {
              let style;
              let decision;
              if (todo.proceed) {
                if (todo.proceed === "accept") {
                  style = "goal-accepted";
                  decision = "Goal Accepted";
                } else if (todo.proceed === "reject") {
                  style = "goal-rejected";
                  decision = "Goal Rejected";
                }
              } else if (!todo.proceed && todo.status === true) {
                style = "goal-pending";
                decision = "Goal Pending";
              }

              return (
                <UserTodo
                  number={index + 1}
                  key={todo._id}
                  id={todo._id}
                  title={todo.title}
                  description={todo.description}
                  creatorId={todo.creator}
                  status={todo.status}
                  responseHandler={responseHandler}
                  addedStyle={style}
                  decision={decision}
                />
              );
            })}
          </ul>
          <Button
            disabled={amount >= 6}
            onClick={openAddHandler}
            addedClass="button-add"
          >
            ADD
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserList;
