import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import listFormulas from "./listFormulas.json";
import "./formulaInput.css";

const FormulaInput = () => {
  const allFunctions = listFormulas.functions;
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFunctions, setSelectedFunctions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.trim().toLowerCase();
    const inputLength = inputValueLower.length;

    return inputLength === 0
      ? []
      : allFunctions.filter(
          (func) => func.toLowerCase().slice(0, inputLength) === inputValueLower
        );
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => {
    return <span>{suggestion}</span>;
  };

  const onChange = (event, { newValue }) => {
    setCurrentInput(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const updatedFunctions = [...selectedFunctions, suggestion];
    setSelectedFunctions(updatedFunctions);
    setCurrentInput("");
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter a function",
    value: currentInput,
    onChange: onChange,
  };

  return (
    <div className="container">
      <h1>Formulas Autocomplete</h1>
      <div>
        <div className="container_list">
          <div className="container_formula">
            {selectedFunctions.map((func, index) => (
              <div key={index} className="formula_item">
                {func}
                <button> X </button>
              </div>
            ))}
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={onSuggestionSelected}
              inputProps={inputProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaInput;
