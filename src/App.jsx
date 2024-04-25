import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40"
      height="34"
      viewBox="0 0 45 48"
    >
      <rect width="24" height="24" stroke="none" fill="none" opacity="0" />
      <g transform="translate(12 12)">
        <path
          style={{
            stroke: "none",
            strokeWidth: "1",
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: "0",
            strokeLinejoin: "miter",
            strokeMiterlimit: "4",
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: "1",
          }}
          d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  // we use "useCallback" to better optimize our passwordGenerator function so it can be in cached
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-+[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, password]);

  //here we using useEffect to run our function on these dependencies
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="max-w-md mx-auto w-full px-4 py-3">
      <h1 className="text-4xl text-white text-center py-8">
        Password Generator
      </h1>
      <div className="w-full relative">
        <input
          className="mx-auto w-full py-3 px-2 rounded bg-stone-400"
          value={password}
          readOnly
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          className="w-10 bg-stone-300 absolute inset-y-0 right-0 rounded-r"
          onClick={copyPassword}
        >
          <CopyIcon />
        </button>
      </div>

      <div className="flex text-sm gap-x-2 my-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            max={100}
            min={5}
            value={length}
            id="range"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="range" className="text-white">
            {length}
          </label>
        </div>

        <div className="flex items-center gap-x-2 ml-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberAllowed"
            onChange={(e) => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberAllowed" className="text-white">
            Number
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="charAllowed"
            onChange={(e) => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charAllowed" className="text-white">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
