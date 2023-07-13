import { Instruction, convertRegToAbi } from "./core/Instruction.js";
import { FRAG } from "./core/Constants.js";
import { configDefault, COPTS_ISA } from "./core/Config.js";


import express from 'express'
//var express = require("express")

var app = express()

function runResult(addToHistory = true) {
    // Get the instruction from input box
    let q = "addi a0, a1, 5";
    const emptyQuery = q === "";
  
    // Push history state and set hash
    if (addToHistory) {
      // Build hash, but make it empty if input is empty
      const hash = emptyQuery ? ' ' : '#'
                                    + 'q='    + q.replace(/\s/g, '+')
                                    + '&abi=' + true
                                    + '&isa=' + 'AUTO';
      // Only push state if hash has changed
      /* if (hash.trimStart() !== window.location.hash) {
        history.pushState(null, null, hash);
      } */
    }
  
    
  
    // Reset UI and exit early if query is empty
    if (q === "") {
      document.getElementById('results-container-box').style.display = 'none';
      return;
    }
    
    console.log("AAAAAA")
    // Convert instruction
    try {
      const inst = new Instruction(q,
        {
          ABI: true,
          ISA: COPTS_ISA['AUTO']
        });
        console.log(inst)
      //renderConversion(inst, abiParameter.checked);
    } catch (error) {
      //renderError(error);
    }
  
    // Display conversion results
    //document.getElementById('results-container-box').style.display = 'initial';
}

runResult()

app.listen(8080)