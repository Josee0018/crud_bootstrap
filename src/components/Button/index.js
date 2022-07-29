import React from "react";
import ButtonB from "react-bootstrap/Button";

const Button = (props) => {
  const { OnClick, value, text, className, children, variant, size, href } = props;

return (<>
    <ButtonB
    href={href}
    size={size}
    variant={variant}
      type="button"
      className={className}
      placeholder={text}
      onClick={OnClick}
      value={value}
    >{children}</ButtonB>
  </>
  );
};

export default Button;
