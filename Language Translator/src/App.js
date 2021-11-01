import "./App.css";
import { useState, useEffect } from "react";
const axios = require("axios").default;
function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [Output, setOutput] = useState("");
  //use object for to and from
  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.translatedText);
      });
  };
  //TO get options and lang codes
  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        header: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      });
  }, []);
  return (
    <div className="App">
      <div>
        From({from}):
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To({to}):
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Enter Your Text Below</h2>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <h2>Translated Text</h2>
        <textarea cols="50" rows="8" value={Output}></textarea>
      </div>
      <div>
        <button onClick={(e) => translate()}>Translate</button>
      </div>
    </div>
  );
}
export default App;
