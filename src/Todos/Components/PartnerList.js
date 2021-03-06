import React, { useState, useContext } from "react";

import PartnerTodo from "./PartnerTodo";
import SuggestGoal from "./SuggestGoal";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import "./PartnerList.css";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

const PartnerList = props => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState();
  const [partnerRequested, setPartnerRequested] = useState(false);

  const openAddHandler = () => setShowAddModal(true);
  const closeAddHandler = () => setShowAddModal(false);

  const refreshActions = () => {
    setRefresh(true);
  };

  const linkPartnerHandler = async data => {
    // Fetch sendPartnerRequest
    try {
      const partner = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/request`,
        "POST",
        JSON.stringify({
          partnerEmail: partnerEmail,
          userId: auth.userId
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      setPartnerRequested(true);
      props.updateDash(partner);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={showAddModal}
        onCancel={closeAddHandler}
        header={`Suggest a goal to your partner`}
        contentClass="suggest__modal-content"
        footerClass="suggest__modal-actions"
        className="suggestion-modal"
        // footer={<button onClick={closeAddHandler}>Add goal</button>}
      >
        <div className="addgoal-container">
          <SuggestGoal closeModal={closeAddHandler} />
        </div>
      </Modal>

      <div className="partnerlist-container">
        {isLoading && <LoadingSpinner asOverlay />}

        {!props.partnerConnected && !partnerRequested && (
          <Card className="usergoals">
            <h2>Add a partner</h2>
            <div className="partnerlist__connection">
              <input
                id="partner-link"
                type="text"
                element="input"
                label="partnerLink"
                placeholder="Partner Email"
                onChange={e => setPartnerEmail(e.target.value)}
              />
              <Button
                onClick={linkPartnerHandler}
                addedClass="button-accept button-suggest"
              >
                Request Link
              </Button>
            </div>
          </Card>
        )}

        {props.partnerConnected && (
          <Card className="usergoals">
            <h2> {props.partner}'s List</h2>
            <ul className="partnerlist__list">
              {props.todos && props.todos.data.length >= 1 ? (
                <ul>
                  {props.todos.data.map((todo, index) => {
                    return (
                      <PartnerTodo
                        status={todo.status}
                        title={todo.title}
                        key={todo._id}
                        proceed={todo.proceed ? todo.proceed : "Pending"}
                        addedClass={todo.status ? "goal-pending" : null}
                      />
                    );
                  })}
                </ul>
              ) : (
                "Partner has no goals right now!"
              )}
            </ul>
            <Button
              onClick={openAddHandler}
              addedClass="button-accept button-suggest"
            >
              Suggest
            </Button>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default PartnerList;
