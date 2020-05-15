import React from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <div
        className="form-group"
        style={{
          fontSize: "0.95rem",
          textAlign: "left",
        }}
      >
        <label>{label}</label>
        <input
          {...input}
          type={type}
          className={"form-control" + (touched && error ? " is-invalid" : "")}
        />
        <small className="invalid-feedback">{touched && error}</small>
      </div>
    </div>
  );
};
