import React, { useRef, useState } from "react";
import "./editor.css";

const Editor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("<p>Start editing...</p>");
  const [htmlValue, setHtmlValue] = useState("<p>Start editing...</p>");

  // Function to apply text formatting based on selected text and command type
  const formatText = (command) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    if (!range) return;

    // Create elements for formatting
    let wrapNode;
    switch (command) {
      case "bold":
        wrapNode = document.createElement("b");
        break;
      case "italic":
        wrapNode = document.createElement("i");
        break;
      case "underline":
        wrapNode = document.createElement("u");
        break;
      case "createLink":
        const url = prompt("Enter the URL");
        wrapNode = document.createElement("a");
        wrapNode.href = url;
        break;
      default:
        return;
    }

    // Wrap the selected text with the chosen formatting
    wrapNode.appendChild(range.extractContents());
    range.insertNode(wrapNode);

    // Clear selection after formatting
    selection.removeAllRanges();

    // Update the state
    updateContent();
  };

  // Function to update the content in the states
  const updateContent = () => {
    const editorContent = editorRef.current.innerText; // Plain text content
    const editorHTMLContent = editorRef.current.innerHTML; // HTML content

    setValue(editorContent);
    setHtmlValue(editorHTMLContent);
  };

  // Ensure paragraphs are wrapped when "Enter" is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior to insert a div or br
      document.execCommand("insertParagraph", false, null);
      updateContent();
    }
  };

  const handleInput = () => {
    updateContent();
  };

  return (
    <div id="editor-wrapper">
      {/* Toolbar */}
      <div id="toolbar">
        <button onClick={() => formatText("bold")} title="Bold">
          <b>B</b>
        </button>
        <button onClick={() => formatText("italic")} title="Italic">
          <i>I</i>
        </button>
        <button onClick={() => formatText("underline")} title="Underline">
          <u>U</u>
        </button>
        <button onClick={() => formatText("createLink")} title="Insert Link">
          🔗 Link
        </button>
      </div>

      {/* Editable content area */}
      <div
        id="editor"
        contentEditable="true"
        ref={editorRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown} // Replaced onKeyPress with onKeyDown
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: htmlValue }} // Set initial value as HTML
      ></div>

      {/* Display plain text and HTML content */}
      <div id="output">
        <h3>Plain Text Content:</h3>
        <pre>{value}</pre>

        <h3>HTML Content:</h3>
        <pre>{htmlValue}</pre>
      </div>
    </div>
  );
};

export default Editor;
