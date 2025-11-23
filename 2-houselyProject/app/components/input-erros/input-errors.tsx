import React from "react";

const InputErrors = ({
  message,
  style,
}: {
  message: string;
  style: string;
}) => {
  if (!message) return null;

  return (
    <div>
      <p className={style}>{message as string}</p>
    </div>
  );
};

export default InputErrors;
