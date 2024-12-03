import React from "react";

const BadRequest = (props: { error: string }) => {
  return (
    <div>
      <h1>Sorry :(</h1>
      <h2>Something not working</h2>
      <p>What's bad: {props.error}</p>
    </div>
  );
};

export default BadRequest;
