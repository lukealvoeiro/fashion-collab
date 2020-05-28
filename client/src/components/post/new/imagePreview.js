import React from "react";
import PropTypes from "prop-types";

const ImagePreview = ({ imagefiles }) =>
  imagefiles.map((file) => {
    const preview = URL.createObjectURL(file);
    return (
      <div key={file.name} className="render-preview">
        <img
          src={preview}
          alt={file.name}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
        {/* <span class="fa-stack">
            <i class="fas fa-circle fa-stack-2x fa-inverse"></i>
            <i class="far fa-trash-alt fa-stack-1x"></i>
          </span> */}

        <div className="details">
          {file.name} - {(file.size / 1024000).toFixed(2)}MB
        </div>
      </div>
    );
  });

ImagePreview.propTypes = {
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default ImagePreview;
