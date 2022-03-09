import { OperationEnum, Operation } from "../App";

export type logicCaseData = [Operation, boolean];
export const logicOpCasesConstant: logicCaseData[] = [
  [
    {
      type: OperationEnum.CONSTANT,
      value: true,
      children: []
    },
    true
  ],
  [
    {
      type: OperationEnum.CONSTANT,
      value: false,
      children: []
    },
    false
  ]
];

export const logicOpCasesNot: logicCaseData[] = [
  [
    {
      type: OperationEnum.NOT,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        }
      ]
    },
    false
  ],
  [
    {
      type: OperationEnum.NOT,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        }
      ]
    },
    true
  ]
];

export const logicOpCasesOr: logicCaseData[] = [
  [
    {
      type: OperationEnum.OR,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        }
      ]
    },
    true
  ],
  [
    {
      type: OperationEnum.OR,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        }
      ]
    },
    true
  ],
  [
    {
      type: OperationEnum.OR,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        }
      ]
    },
    true
  ],
  [
    {
      type: OperationEnum.OR,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        }
      ]
    },
    false
  ]
];

export const logicOpCasesAnd: logicCaseData[] = [
  [
    {
      type: OperationEnum.AND,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        }
      ]
    },
    false
  ],
  [
    {
      type: OperationEnum.AND,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        }
      ]
    },
    false
  ],
  [
    {
      type: OperationEnum.AND,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: true,
          children: []
        }
      ]
    },
    true
  ],
  [
    {
      type: OperationEnum.AND,
      value: undefined,
      children: [
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        },
        {
          type: OperationEnum.CONSTANT,
          value: false,
          children: []
        }
      ]
    },
    false
  ]
];
