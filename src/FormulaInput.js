import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as math from "mathjs";
import useStore from "./store";

const fetchSuggestions = async (query) => {
  try {
    const parsed = math.parse(query);

    console.log(parsed);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFormula(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    const newFormula = formula + suggestion;
    setFormula(newFormula);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter formula..."
        autocomplete="on"
      />
      {suggestions && (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div>Formula: {formula}</div>
    </div>
  );
};

export default FormulaInput;
