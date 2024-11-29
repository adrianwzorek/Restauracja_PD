import React from "react";

const ChangePage = (props: { prev: string; next: string }) => {
  return (
    <div className="pagination">
      <button className="btn" onClick={() => console.log(props.prev)}>
        {"<<"}
      </button>
      <button className="btn" onClick={() => console.log(props.next)}>
        {">>"}
      </button>
    </div>
  );
};

export default ChangePage;
