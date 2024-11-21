import { ReactNode } from "react";
import "./InputWrapper.css";

type InputWrapperProps = {
    children: ReactNode,
    flowAlongRow: boolean,
    className?: string
}


export default function InputWrapper({ children,  flowAlongRow}: InputWrapperProps) {
  return <div className={`input-wrapper ${flowAlongRow ? "flex-row": ""}`}>{children}</div>;
}
