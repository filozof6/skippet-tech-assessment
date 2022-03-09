import React, { useContext } from "react";
import { ArgsContext } from "../context/ArgsContext";

export default function ArgSelect(props: {
  onChange: (value: string) => void;
}) {
  const { args } = useContext(ArgsContext);
  return (
    <select
      data-testid="ArgSelect"
      onChange={e => {
        props.onChange(e.target.value);
      }}
    >
      <option disabled>select arg</option>
      {Object.keys(args).map((argName: string) => {
        return (
          <option key={argName} value={argName}>
            {argName}
          </option>
        );
      })}
    </select>
  );
}
