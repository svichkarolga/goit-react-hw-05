import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      No pages was found. Please, go to the <Link to="/">home page</Link>
    </div>
  );
};

export default NotFoundPage;
