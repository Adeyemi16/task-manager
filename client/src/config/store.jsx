/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
const Context = createContext();

let initialUser = "";

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  //save the user to local storage
  useEffect(() => {
    if (currentUser !== initialUser) {
      localStorage.setItem("userinfo", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    const retrieveUser = JSON.parse(localStorage.getItem("userinfo"));
    if (retrieveUser) {
      setCurrentUser(retrieveUser);
    }
  }, []);
  // retrieve cart from local storage

  //check token expiration
  useEffect(() => {
    const checkJwtExpiry = async () => {
      const token = JSON.parse(localStorage.getItem("userinfo"));
      if (token) {
        const { exp } = jwt_decode(token.access_token);
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem("userinfo");
          location.replace("/");
          toast.error("Token expired, pls sign in to get access");
        }
      }
    };
    checkJwtExpiry();
  });

  const logOut = () => {
    localStorage.removeItem("userinfo");
    location.replace("/");
    toast.success("Logged out successfully");
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        logOut,
      }}
    >
      {children}
    </Context.Provider>
  );
  
};


StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStore = () => useContext(Context);
