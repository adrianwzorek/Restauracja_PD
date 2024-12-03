import React from "react";
import { useParams } from "react-router-dom";

const Help = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      Help
      {id}
    </div>
  );
};

export default Help;
