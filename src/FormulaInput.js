import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import listFormulas from "./listFormulas.json";
import highlight from "autosuggest-highlight/match";
import "./formulaInput.css";

const FormulaInput = () => {
  const allFunctions = listFormulas.functions;
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter an Excel function",
    value,
    onChange: onChange,
  };

  return (
    <div>
      <h1>Excel Function Autocomplete</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default FormulaInput;
