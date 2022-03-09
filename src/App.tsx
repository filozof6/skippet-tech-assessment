import React, { useState, useEffect, useContext } from "react";
import ArgList from "./components/ArgList";
import ArgSelect from "./components/ArgSelect";
import BoolSelect from "./components/BoolSelect";
import OperationSelect from "./components/OperationSelect";
import { ArgsContext } from './context/ArgsContext';

export enum OperationEnum {
  NOT = 'not',
  AND = 'and',
  OR = 'or',
  CONSTANT = 'constant',
  ARGUMENT = 'argument',
  UNDEFINED = 'undefined'
}

export type Args = { [argname: string]: boolean };
export type Operation = {
  type: OperationEnum,
  value: boolean | string | undefined,
  children: Operation[],
};

export const OPERATION_INIT_OBJECT: Operation = {
  type: OperationEnum.UNDEFINED,
  value: undefined,
  children: [],
}

export const evaluateOperation = (operation: Operation, args: Args): boolean => {
  switch (operation.type) {
    case OperationEnum.CONSTANT:
      return !!operation.value;
    
    case OperationEnum.ARGUMENT: 
      return args[`${operation.value}`];

    case OperationEnum.NOT: 
      return !evaluateOperation(operation.children[0], args);

    case OperationEnum.AND: 
      return operation.children.reduce((acc: boolean, val: Operation) => {
        acc = acc && evaluateOperation(val, args);

        return acc;
      }, true);

    case OperationEnum.OR: 
      return operation.children.reduce((acc: boolean, val: Operation) => {
        acc = acc || evaluateOperation(val, args);

        return acc;
      }, false);

    default: 
      throw Error('Unexpected arguments');
  }
}
export function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
}): JSX.Element {
  let canAddOps = false;
  if ([
    OperationEnum.AND,
    OperationEnum.OR
  ].includes(props.value.type)) {
    canAddOps = true;
  }
  let toReturn;
  switch (props.value.type) {
    case OperationEnum.UNDEFINED:
    case OperationEnum.AND:
    case OperationEnum.OR: 
    case OperationEnum.NOT: 
      toReturn = <>
        <OperationSelect value={props.value.type} onChange={(operationType) => {
          let initChildren: Operation[] = [];
          switch (operationType) {
            case OperationEnum.AND:
            case OperationEnum.OR: 
              initChildren = [ { ...OPERATION_INIT_OBJECT }, { ...OPERATION_INIT_OBJECT } ];
              break;
            case OperationEnum.NOT:
              initChildren = [ { ...OPERATION_INIT_OBJECT } ];
              break;

          }
          const changedOperation: Operation = {
            value: undefined,
            type: operationType,
            children: initChildren,
          }
          props.onChange(changedOperation);
        }} />
      </>;
    break;

    case OperationEnum.CONSTANT:
      toReturn = <>
        <BoolSelect onChange={(boolVal: boolean) =>{
          props.onChange({
            ...props.value,
            value: boolVal,
            children: [],
          });
        }} value={!!props.value.value} />
      </>
      break;

    case OperationEnum.ARGUMENT:
      toReturn = <>
        <ArgSelect onChange={(argName: string) =>{
          props.onChange({
            ...props.value,
            value: argName,
            children: [],
          });
        }} />
      </>
    break;
  }

  if (!toReturn) {
    return <></>;
  }

  return <span data-testid="OperationBuilder">
    {toReturn}
    <input type="button" onClick={() => {
      props.onChange({
        type: OperationEnum.UNDEFINED,
        value: undefined,
        children: [],
      });
    }} value="X" /><br />
    <div key={Math.random()} style={{ marginLeft: 5}}>
      { props.value.children.map((v: Operation, i) => {
        return <OperationBuilder key={Math.random()} value={v} onChange={(childOpToUpdate) => {
          const newChildren = [...props.value.children]
          newChildren.splice(i, 1, childOpToUpdate)
          const opToUpdate = {
            ...props.value,
            children: newChildren,
          };
          props.onChange(opToUpdate);
        }}/>
      })}
      {canAddOps &&  <>
          <input type="button" 
            onClick={() => {
              const newOp: Operation = {
                ...props.value,
                children: [
                  ...props.value.children,
                  OPERATION_INIT_OBJECT,
                ]
              };
              props.onChange(newOp);
            }}
            value="+ add op" 
          />
          <br/>
        </>
      }
    </div>
  </span>
}

export default function App() {
  const [op, setOp] = useState<Operation>(OPERATION_INIT_OBJECT);
  const {args} = useContext(ArgsContext);
  const [result, setResult] = useState<boolean | string>('undefined');

  useEffect(() => {
    try {
      setResult(evaluateOperation(op, args).toString());
    } catch (e) {
      setResult(OperationEnum.UNDEFINED);
    }
  }, [op, args])

  return (
    <div>
      <ArgList/>
      <br />
      <OperationBuilder value={op} onChange={(operation) => {
        setOp({ ...operation })
      }}/>
      <p>
        Result: {result}
      </p>
    </div>
  );
}
