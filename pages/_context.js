export const address="0x76e0eFcd0a0dDd5cf1853896Bb7b7ea3e3642694"
export const abi= [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "recepient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "AddTask",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      }
    ],
    "name": "DeleteTask",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "taskText",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "taskTitle",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      }
    ],
    "name": "addTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "deleteTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyTask",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "taskTitle",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "taskText",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isDeleted",
            "type": "bool"
          }
        ],
        "internalType": "struct TaskContract.Task[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]