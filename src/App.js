import React, { useState } from "react";
import "./App.scss";
import generateMnemonics from "./utils/mnemonicgenerator";

function App() {
  const numbers = [{key:'1', text:''},
    {key:'2', text:'abc'},
    {key:'3', text:'def'},
    {key:'4', text:'ghi'},
    {key:'5', text:'jkl'},
    {key:'6', text:'mno'},
    {key:'7', text:'pqrs'},
    {key:'8', text:'tuv'},
    {key:'9', text:'wxyz'},
    {key:'', text:'Reset'},
    {key:'0', text:''},
    {key:'', text:'Enter'}
];
  const [inputNumber, setInputNumber] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState([]);

  function clickNumbers(val) {
    setError('')
    if(val.text === 'Reset'){
      //reset input number
      setInputNumber('');
      //reset results
      setResult([])
    }else if(val.text === 'Enter' && inputNumber.split('').length){
        if(inputNumber.split('').length <= 6){
            generateMnemonics(inputNumber.split('')).then((res)=>{
            setResult(res);
          })
        } else{
          setResult([]);
          setError('Maximum input length is 6 only');
        }
    }else{
      setInputNumber(inputNumber+val.key)
    }
  }
  return (
    <div className="App">
      {result.length > 0 &&
        <div className="mnemonic-display">
          {result.length > 0 && result.map((val, key) => {
            return (
              <div key={key}
                className="individualResult"
              >
              {val.join('')}&nbsp;
              </div>
            );
          })}
          <div>Total Mnemonic Count {result.length}</div>
        </div>
      }
      <div className="KeyPad">
        { error && error !== '' && <div className="display alert">{error}</div>}
        <div className="display">{inputNumber}</div>
         <div className="numbers">
          {numbers.map((val, key) => {
            return (
              <div
                key={key}
                className="individualNumber"
                onClick={() => {
                  clickNumbers(val);
                }}
              >
                {""}
                <div>{val.key}</div>
                <div>{val.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;