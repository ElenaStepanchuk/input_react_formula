import "./App.css";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import FormulaInput from "./FormulaInput";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FormulaInput />
    </QueryClientProvider>
  );
};

export default App;
