import { Instruction } from "./core/Instruction.js";
import { COPTS_ISA } from "./core/Config.js";


import express from 'express'
const port = 8080
const errorQuery = {
  'errorMessage': "",
}


var app = express()
app.use(express.json());


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

function requestValidation(data){
  const { query, ABI, ISA } = data
  
  if (query && typeof ABI == "boolean" && ISA) {    
    if(ISA != 'AUTO' && ISA != 'RV32I' && ISA != 'RV64I' && ISA != 'RV128I')
      return false
    
    return true
  }
  return false
}

function findObject(instructionResult, string){
  const index = instructionResult.binFrags.findIndex((line) => line.field === string)
  if(index === -1){
    errorQuery.errorMessage = "Not found"
    return errorQuery
  }
  let object = instructionResult.binFrags[index]
  return object;

}


app.post('/', (req, res) => {
  let { query, ABI, ISA } = req.body;

  let response;
  let status
  if(requestValidation(req.body)){
    response = runResult(query, ABI, ISA);
    status = 200
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response); 
})

app.post('/funct7', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "funct7");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response); 
})

app.post('/rs2', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "rs2");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response); 
})

app.post('/rs1', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "rs1");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response);
})

app.post('/funct3', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "funct3");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response);
})

app.post('/rd', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "rd");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response);
})

app.post('/opcode', (req, res) => {
  let {query, ABI, ISA} = req.body;
  let instructionResult = runResult(query, ABI, ISA)

  const isErrorInstruction = instructionResult.hasOwnProperty("errorMessage")

  let response;
  let status
  if(requestValidation(req.body) && !isErrorInstruction){
    response = findObject(instructionResult, "opcode");
    status = 200
  }else if(isErrorInstruction){
    response = instructionResult
    status = 400
  }else{
    errorQuery.errorMessage = "JSON request Error";
    response = errorQuery;
    status = 400
  }

  res.status(status)
  res.json(response);
})

app.listen(port, ()=>{
  console.log("Init API")
})