import React, { useEffect } from "react";

const CommentComponent = (props) => {
  const { datahref, width } = props;
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [datahref]);
  return (
    <div
      className="fb-comments "
      data-href={datahref}
      data-width={width}
      data-numposts="5"
    ></div>
  );
};

export default CommentComponent;
