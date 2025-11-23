import React from "react";

// تعریف تایپ برای props کامپوننت
interface SubmitButtonProps {
  text: string;
  style: string;
  loadingBtn?: boolean;
}

const SubmitButton = ({ text, style, loadingBtn }: SubmitButtonProps) => {
  return (
    <button className={style}>
      {loadingBtn ? "loading..." : text} {/* نمایش متن یا "loading..." */}
    </button>
  );
};

export default SubmitButton;