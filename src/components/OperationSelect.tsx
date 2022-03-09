import React from "react";
import { OperationEnum } from "../App";

export default function OperationSelect(props: {
  value: OperationEnum;
  onChange: (value: OperationEnum) => void;
}) {
  return (
    <select
      data-testid="OperationSelect"
      onChange={e => {
        props.onChange(e.target.value as OperationEnum);
      }}
      defaultValue={props.value}
    >
      {Object.values(OperationEnum).map((val, i) => {
        return (
          <option key={val} value={val}>
            {val}
          </option>
        );
      })}
    </select>
  );
}
