import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await fetch("http://192.168.43.32:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMetadata(data);
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <div className="App">
      <form className="App-header">
        <label htmlFor="fileupload">Please choose a pdf file</label>
        <br />
        <input
          type="file"
          id="myfile"
          name="myfile"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <input type="submit" id="submit" onClick={handleSubmit}/>
        
        {metadata && 
        <>
        <p>Title : {metadata?.title}</p>
        <p>Author : {metadata?.author}</p>
        <p>Created on : {metadata?.creationDate}</p>
        </>}
      </form>
    </div>
  );
}

export default App;
