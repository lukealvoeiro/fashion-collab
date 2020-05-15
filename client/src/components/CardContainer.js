import React, { Component } from "react";
import Card from "./Card";

class CardContainer extends Component {
  state = {};
  render() {
    return (
      <div className="card-columns">
        <Card></Card>
      </div>
    );
  }
}

export default CardContainer;
