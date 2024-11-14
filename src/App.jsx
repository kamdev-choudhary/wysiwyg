import { useState } from "react";
import { Box, TextareaAutosize, TextField } from "@mui/material";

function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>B</Box>
        <TextareaAutosize placeholder="start editing" />
      </Box>
    </>
  );
}

export default App;
