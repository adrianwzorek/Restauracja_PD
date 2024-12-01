import React from "react";

const ChangePage = (props: {
  prev: string | null;
  next: string | null;
  setUrl: Function;
}) => {
  const setPage = (url: string | null) => {
    return url ? props.setUrl(url) : "";
  };
  return (
    <div className="pagination">
      <button className="btn" onClick={() => setPage(props?.prev)}>
        {"<<"}
      </button>
      <button className="btn" onClick={() => setPage(props?.next)}>
        {">>"}
      </button>
    </div>
  );
};

export default ChangePage;
