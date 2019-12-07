import React from "react";

import PartnerTodo from "./PartnerTodo";
import Card from "../../Shared/Components/UIElements/Card";
import "./PartnerList.css";

const PartnerList = props => {
  const username = props.partner;
  return (
    <div className="partnerlist-container">
      <Card>
        <h2> {username}'s List</h2>

        <ul className="partnerlist__list">
          {props.todos.map((todo, index) => {
            return (
              <PartnerTodo
                number={index + 1}
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                creatorId={todo.creator}
                status={todo.status}
                deadline={todo.deadline}
              />
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default PartnerList;
