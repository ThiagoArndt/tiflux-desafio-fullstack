import { ReactNode } from "react";

interface InputRootProps {
  children: ReactNode;
}

function InputRoot(props: Readonly<InputRootProps>) {
  const { children } = props;
  return <div className="w-full">{children}</div>;
}

export default InputRoot;
