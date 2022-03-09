import React from "react";

export default function BoolSelect(props: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <select
      data-testid="BoolSelect"
      onChange={e => {
        props.onChange(!!parseInt(e.target.value, 10));
      }}
      defaultValue={+props.value}
    >
      <option value={1}>true</option>
      <option value={0}>false</option>
    </select>
  );
}
