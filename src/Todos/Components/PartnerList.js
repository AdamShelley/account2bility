import React, { useState } from "react";

import PartnerTodo from "./PartnerTodo";
import SuggestGoal from "./SuggestGoal";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import "./PartnerList.css";

const PartnerList = props => {
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddHandler = () => setShowAddModal(true);
  const closeAddHandler = () => setShowAddModal(false);

  console.log(props);

  const username = props.partner;
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
          <SuggestGoal closeModal={closeAddHandler} />
        </div>
      </Modal>

      <div className="partnerlist-container">
        <Card>
          <h2> {props.partner}'s List</h2>

          <ul className="partnerlist__list">
            <ul>
              {props.todos.data.map((todo, index) => {
                return (
                  <PartnerTodo
                    status={todo.status}
                    title={todo.title}
                    key={todo.id}
                  />
                );
              })}
            </ul>
          </ul>
          <Button onClick={openAddHandler} addedClass="button-suggest">
            Suggest
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default PartnerList;
