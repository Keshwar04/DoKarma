import React from "react";

const LineBreakText = ({ text }: any) => {
  return (
    <p>
      {text.split("\n").map((e: any, idx: number) => (
        <React.Fragment key={idx}>
          {e}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default LineBreakText;
