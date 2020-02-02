import React, { useContext, useState } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/UIElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import { AuthContext } from "../../Shared/context/auth-context";
import partnerpic from "../../img/partner.jpg";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import "./Account.css";

const Account = props => {
  console.log(props);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const openModal = () => setShowConfirmModal(true);
  const closeModal = () => setShowConfirmModal(false);

  const deleteAccountHandler = () => {
    console.log("Are you sure modal?");
  };

  const delinkAccountHandler = async () => {
    closeModal();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/delink`,
        "PATCH",
        JSON.stringify({
          partnerId: auth.partnerId
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={closeModal}
        header="Are you sure?"
        className="logout-modal"
        footerClass=""
        footer={
          <React.Fragment>
            <Button onClick={closeModal} inverse>
              CANCEL
            </Button>
            <Button onClick={delinkAccountHandler}>DELINK</Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delink your partner. You cannot undo this.
        </p>
      </Modal>

      <div className="account-container">
        <Card className="account-container--card">
          <h2>Account Settings</h2>
          <p>This page is WIP - functionality not included yet</p>
          <div className="account-container--details">
            <div className="user-details">
              <img src={auth.userImage} alt="user" />
              <p className="user-details--name">{auth.username}</p>
            </div>
            <div className="partner-details">
              <img src={partnerpic} alt="Partner img" />
              <p>{auth.partnerName}</p>
            </div>
          </div>
          <div className="account-buttons">
            <Button
              onClick={deleteAccountHandler}
              inverse
              addedClass="button--deactivate"
            >
              Deactivate account
            </Button>
            <Button onClick={openModal} inverse addedClass="button--delink">
              Remove partner link
            </Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Account;
