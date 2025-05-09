import React from "react";
import "./style.css";

function Like(props) {
  return (
    <div className="box-like">
      <input
        type="checkbox"
        id={`${props.id}`}
        className="inputCheck like"
        onChange={props.callback}
        checked={props.checked} // <- CORRETO!
      />
      <label className="like-label" htmlFor={props.id}></label>
    </div>
  );
}

export default Like;
