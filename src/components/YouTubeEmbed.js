import React from "react";
import PropTypes from "prop-types";

const YouTubeEmbed = ({ embedId, width, height }) => (
  <iframe
    width={width}
    height={height}
    src={`https://www.youtube.com/embed/${embedId}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded YouTube Video"
  />
);

YouTubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YouTubeEmbed;
