import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-+[]{}~`";
  }, [length, numberAllowed, charAllowed, setPassword]);
  return (
    <>
      <h1 className="text-4xl text-white text-center py-8">
        Password Generator
      </h1>
    </>
  );
}

export default App;
