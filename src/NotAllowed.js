import React from "react";
import { Button,Result } from "antd";

function NotAllowed() {
  return (
    <div className="App">
      <Result
        status="403"
        title="404"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}

export default NotAllowed;
