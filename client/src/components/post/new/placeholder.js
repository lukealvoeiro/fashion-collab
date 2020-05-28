import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdCloudUpload } from "react-icons/md";

const Placeholder = ({ error, touched }) => (
  <div className="placeholder-preview">
    <IconContext.Provider value={{ size: "7rem" }}>
      <MdCloudUpload />
    </IconContext.Provider>
    <p>Click or drag image file to this area to upload.</p>
  </div>
);

Placeholder.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default Placeholder;
