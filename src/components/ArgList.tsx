import React, { useContext } from "react";
import { ArgsContext } from "../context/ArgsContext";
import BoolSelect from "./BoolSelect";

export default function ArgList() {
  const { args, setArgs } = useContext(ArgsContext);

  const onChange = (
    previousName: string,
    argName: string,
    argValue: boolean
  ) => {
    if (previousName !== argName) {
      delete Object.assign(args, { [argName]: args[previousName] })[
        previousName
      ];
    }

    args[argName] = argValue;

    setArgs({
      ...args
    });
  };
  return (
    <div>
      {Object.keys(args).map((name: string, i) =>
        <span key={name}>
          <input
            name={`${i}`}
            value={name}
            onChange={e => {
              onChange(name, e.target.value, args[name]);
            }}
          />
          <BoolSelect
            value={args[name]}
            onChange={value => {
              onChange(name, name, value);
            }}
          />
          <input
            type="button"
            onClick={() => {
              delete args[name];
              setArgs({
                ...args
              });
            }}
            value="X"
          />
          <br />
        </span>
      )}
      <br />
      <input
        type="button"
        onClick={() => {
          setArgs({
            ...args,
            newarg: true
          });
        }}
        value="Add new"
      />
    </div>
  );
}
