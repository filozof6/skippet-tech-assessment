import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Operation,
  OperationBuilder,
  OperationEnum,
  evaluateOperation
} from "./App";
import { ArgsContext } from "./context/ArgsContext";
import {
  logicOpCasesAnd,
  logicOpCasesConstant,
  logicOpCasesNot,
  logicOpCasesOr
} from "./test/logic-data-providers";

const fullyLoadedContext = {
  args: {
    someArg: true
  },
  setArgs: jest.fn()
};

const testOp: Operation = {
  type: OperationEnum.AND,
  value: undefined,
  children: [
    {
      type: OperationEnum.CONSTANT,
      value: false,
      children: []
    },
    {
      type: OperationEnum.OR,
      value: false,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        },
        {
          type: OperationEnum.NOT,
          value: false,
          children: [
            {
              type: OperationEnum.ARGUMENT,
              value: true,
              children: []
            }
          ]
        }
      ]
    }
  ]
};

test("renders operations", async () => {
  const { container } = render(
    <ArgsContext.Provider value={fullyLoadedContext}>
      <OperationBuilder
        data-testId="operation-builder"
        value={testOp}
        onChange={jest.fn()}
      />
    </ArgsContext.Provider>
  );

  const opBuilders = await screen.findAllByTestId("OperationBuilder");
  const argSelectors = await screen.findAllByTestId("ArgSelect");
  const boolSelectors = await screen.findAllByTestId("BoolSelect");
  const opSelectors = await screen.findAllByTestId("OperationSelect");

  expect(opBuilders.length).toEqual(6);
  expect(argSelectors.length).toEqual(1);
  expect(boolSelectors.length).toEqual(2);
  expect(opSelectors.length).toEqual(3);
});

const dataProvider = [
  ...logicOpCasesConstant,
  ...logicOpCasesNot,
  ...logicOpCasesAnd,
  ...logicOpCasesOr
];
test.each(
  dataProvider
)("test calculations", (testOperation: Operation, expectedResult: boolean) => {
  const result = evaluateOperation(testOperation, fullyLoadedContext.args);

  expect(result).toBe(expectedResult);
});
