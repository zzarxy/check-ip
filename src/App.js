import './App.css';
import { useState } from "react";

function App() {
   const [validationError, setValidationError] = useState(false);
   const [input, setInput] = useState("");
   const [jsonData, setJsonData] = useState();
   const [isLoading, seIsLoading] = useState();

   const onSubmit = () => {
      const regex = /^[0-9\.]{8,16}$/;

      if (!regex.test(input)) {
         setValidationError(true);
         setJsonData();
         return;
      }
      setValidationError(false);

      seIsLoading(true);
      fetch("https://api.api-ninjas.com/v1/iplookup?address=" + input, {
         headers: { "X-Api-Key": "6QpmckgvhLRCWLPGjynYfIi4eGawIrBeCROxcxyI" }
      })
         .then((response) => response.json())
         .then((data) => {
            setJsonData(data);
            console.log(data);
         })
         .catch((error) => {
            console.error("Error:", error);
            setJsonData(`${error}`);
         })
         .finally(() => seIsLoading(false));
   };

   const handleChange = (event) => {
      setInput(event.target.value);
   };

   return (
      <div className="App">
         <div className="leftside">
            <div className="container">
               <h4>
                  The IP check provides location information for any valid IP address.
                  It works with both IPv4 and IPv6 addresses.
               </h4>
               <div className="Input">
                  <input type="ip" onChange={handleChange} />
                  <button type="button" onClick={onSubmit}>
                     Check ip
                  </button>
               </div>
               <div hidden={!validationError} className="validation-hint">
                  <ul>
                     <li>Contain numbers and dot only</li>
                     <li>Minimum length 8</li>
                     <li>Maximum length 16</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="rightside">
            <pre>
               {isLoading ? "Loading..." : JSON.stringify(jsonData, null, 2)}
            </pre>
         </div>
      </div>
   );
}

export default App;