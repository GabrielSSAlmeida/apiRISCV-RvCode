import { Instruction, convertRegToAbi } from "./core/Instruction.js";
import { FRAG } from "./core/Constants.js";
import { configDefault, COPTS_ISA } from "./core/Config.js";


import express from 'express'
//var express = require("express")

var app = express()
app.use(express.json());

const errorQuery = {
  'errorMessage': "",
}

function runResult(query, ABI, ISA) {
  if (query === "") {
    errorQuery.errorMessage = "Query is empty";
    return errorQuery;
  }
  
  // Convert instruction
  try {
    const inst = new Instruction(query,
      {
        ABI: ABI,
        ISA: COPTS_ISA[ISA]
      });
      return inst;

  } catch (error) {
    errorQuery.errorMessage = "Error Instruction";
    return errorQuery;
  }
}

app.post('/', (req, res) => {
  let data = req.body;
  console.log(data)
  res.json(runResult(data.query, data.ABI, data.ISA)); 
})


app.post('/rd', (req, res) => {
  let data = req.body;
  console.log(data)

  let instructionResult = runResult(data.query, data.ABI, data.ISA)

  console.log(instructionResult.binFrags)

  res.json("aa"); 
})

app.listen(8080)