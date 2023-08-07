import { HashRouter, Routes, Route } from "react-router-dom";
import { JsxElement } from "typescript";
import Login from "./Screens/Login";
import SignUp from "./Screens/Signup";
import Home from "./Screens/Home";
import AddAndShowPassword from "./Screens/AddAndShowPassword";
import { useState, createContext } from "react";
export const UserContext = createContext<String | null>(null);

const AppRouter: React.FC = () => {
  const [user, setUser] = useState<String | null>(null);

  return (
    <UserContext.Provider value={user}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addshowpassword" element={<AddAndShowPassword />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
};
export default AppRouter;
