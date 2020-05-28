import React, { Fragment } from "react";

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <Fragment>
      <div
        className="form-group"
        style={{
          fontSize: "0.95rem",
          textAlign: "left",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <textarea
          {...input}
          placeholder="Describe your post here"
          type="text"
          className="form-control"
          rows={3}
          style={{ resize: "none" }}
        />
      </div>
    </Fragment>
  );
};
