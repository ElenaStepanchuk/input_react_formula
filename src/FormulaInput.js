import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Autosuggest from "react-autosuggest";
import * as math from "mathjs";
import useStore from "./store";

const fetchSuggestions = async (query) => {
  try {
    const parsed = math.parse(query);
    const suggestions = parsed
      .filter((node) => node.isSymbolNode)
      .map((node) => node.name);
    return suggestions;
  } catch (error) {
    console.error("Error parsing the query:", error);
    return [];
  }
};

const FormulaInput = () => {
  const { formula, setFormula } = useStore();
  const [inputValue, setInputValue] = useState("");

  const { data: suggestions } = useQuery({
    queryKey: ["suggestions", inputValue],
    queryFn: () => fetchSuggestions(inputValue),
    enabled: !!inputValue,
  });

  const getSuggestions = (value) => {
    return suggestions || [];
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const onChange = (event, { newValue }) => {
    setInputValue(newValue);
    setFormula(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setInputValue(value);
  };

  const onSuggestionsClearRequested = () => {};

  const inputProps = {
    placeholder: "Enter formula...",
    value: inputValue,
    onChange: onChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={getSuggestions(inputValue)}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <div>Formula: {formula}</div>
    </div>
  );
};

export default FormulaInput;
