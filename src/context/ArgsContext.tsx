import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Args } from "../App";

type ArgsContextType = {
  args: Args;
  setArgs: Dispatch<SetStateAction<Args>>;
};

export const ArgsContext = React.createContext<ArgsContextType>({
  args: {},
  setArgs: () => undefined
});

export function ArgsContextProvider({ children }: { children: ReactNode }) {
  const [args, setArgs] = React.useState<Args>({});

  const Provider = ArgsContext.Provider;

  return (
    <Provider value={{ args, setArgs }}>
      {children}
    </Provider>
  );
}
