// SPDX-License-Identifier: AGPL-3.0-or-later
/**
 * This API was based on codes from developer Joël Porquet-Lupine.
 * His work can be found at https://gitlab.com/luplab/rvcodecjs/-/tree/main/
 * and https://luplab.cs.ucdavis.edu/2022/06/03/rvcodec-js.html
 */


/**
 *  Trabalho 2 - Organização e Arquitetura de Computadores
 *  Camila Donda Ronchi - 13672220
 *  Gabriel Sousa Santos de Almeida - 13837432
 *  Lucas Piovani Ferreira - 13836813
 */

import { Instruction, convertRegToAbi } from "./core/Instruction.js";
import { COPTS_ISA } from "./core/Config.js";


import express from 'express'
const port = 8080
const errorQuery = {
  'errorMessage': "",
}

var app = express()
app.use(express.json());


function runResult(query, abi, isa) {
  if (query === "") {
    errorQuery.errorMessage = "Query is empty";
    return errorQuery;
  }
  
  // Convert instruction
  try {
    const inst = new Instruction(query,
      {
        ABI: abi,
        ISA: COPTS_ISA[isa]
      });
      
      //Converts name of registers to ABI type
      if(abi){
        inst.asmFrags.map(frag => {
          let asm = convertRegToAbi(frag.asm);

          if (frag.mem) {
            asm = '(' + asm + ')';
          }

          frag.asm = asm;
        });
      }
      return inst;

  } catch (error) {
    errorQuery.errorMessage = "Error Instruction";
    return errorQuery;
  }
}

//checks if the sent request is valid
function requestValidation(data){
  const { query, ABI, ISA } = data
  
  //There must be keys 'query', 'ABI' and 'ISA'
  if (query && typeof ABI == "boolean" && ISA) {    
    //valid types for ISA
    if(ISA != 'AUTO' && ISA != 'RV32I' && ISA != 'RV64I' && ISA != 'RV128I')
      return false
    
    return true
  }
  return false
}

//Separate fields for each request
function findObject(instructionResult, string){
  const index = instructionResult.binFrags.findIndex((line) => line.field === string)
  if(index === -1){
    errorQuery.errorMessage = "Not found"
    return errorQuery
  }
  let object = instructionResult.binFrags[index]
  return object;

}

//main request. Send all information
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

//send only the funct7 field
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

//send only the rs2 field
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


//send only the rs1 field
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

//send only the funct3 field
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

//send only the rd field
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

//send only the opcode field
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

//main request. Send all information
app.get('/', (req, res) => {
  let str = "Use only POST methods in URLs\n\t/\n\t/funct7\n\t/rs1\n\t/rs2\n\t/rd\n\t/opcode\nspecified in the documentation."
  res.send(str)
})


app.listen(port, ()=>{
  console.log("Init API")
})