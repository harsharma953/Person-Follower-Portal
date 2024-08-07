import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Test from "./components/test/test";
import { useState } from "react";
const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <Navbar isConnected={isConnected} />
      <Main setIsConnected={setIsConnected} />
      {/* <Test /> */}
    </>
  );
};

export default App;
