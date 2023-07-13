import { Instruction } from "./core/Instruction.js";
import { COPTS_ISA } from "./core/Config.js";


import express from 'express'
const port = 8080
const errorQuery = {
  'errorMessage': "",
}


var app = express()
app.use(express.json());


function requestValidation(data){
  const { query, ABI, ISA } = data
  
  //
  if (query && ABI && ISA) { 
    if(ABI !== (false || true))
      return false
    
    if(ISA !== ('AUTO' || 'RV32I' || 'RV64I' || 'RV128I'))
      return false
    
    return true
  }
  return false
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

function findObject(instructionResult, string){
  const index = instructionResult.binFrags.findIndex((line) => line.field === string)
  let object = instructionResult.binFrags[index]
  return object;
}

app.post('/', (req, res) => {
  let { query, ABI, ISA } = req.body;

  res.json(runResult(query, ABI, ISA)); 
})

app.post('/funct7', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "funct7")); 
})

app.post('/rs2', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "rs2")); 
})

app.post('/rs1', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "rs1")); 
})

app.post('/funct3', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "funct3")); 
})

app.post('/rd', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "rd")); 
})

app.post('/opcode', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  res.json(findObject(instructionResult, "opcode")); 
})

app.listen(port, ()=>{
  console.log("Init API")
})