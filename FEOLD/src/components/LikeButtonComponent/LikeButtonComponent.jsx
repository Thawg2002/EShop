import React, { useEffect } from "react";

const LikeButtonComponent = (props) => {
  const { datahref } = props;
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [datahref]);
  return (
    <div
      className="fb-like"
      data-href={datahref}
      data-width=""
      data-layout=""
      data-action=""
      data-size=""
      data-share="true"
    ></div>
  );
};

export default LikeButtonComponent;
