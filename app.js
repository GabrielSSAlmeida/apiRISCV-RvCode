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

app.post('/', (req, res) => {
  let { query, ABI, ISA } = req.body;

  res.json(runResult(query, ABI, ISA)); 
})


app.post('/rd', (req, res) => {
  let data = req.body;
  console.log(data)

  let instructionResult = runResult(data.query, data.ABI, data.ISA)

  console.log(instructionResult.binFrags)

  res.json("aa"); 
})

app.listen(port, ()=>{
  console.log("Init API")
})