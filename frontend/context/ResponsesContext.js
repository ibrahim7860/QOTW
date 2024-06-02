import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

import { userContext } from "./UserContext";
import { useToken } from "./TokenContext";

const ResponsesContext = createContext();

export const useResponses = () => useContext(ResponsesContext);

export const ResponsesProvider = ({ children }) => {
  const { getToken } = useToken();
  const { globalUserId } = userContext();
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  const [responses, setResponses] = useState([]);

  const fetchAllResponses = async () => {
    try {
      if (globalUserId) {
        const response = await axios.get(
          `http://192.168.254.138:8080/response/get-all-responses`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        setResponses(response.data);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  useEffect(() => {
    if (globalUserId) {
      fetchAllResponses();
    }
  }, [globalUserId]);

  return (
    <ResponsesContext.Provider
      value={{
        responses,
        setResponses,
        responseSubmitted,
        setResponseSubmitted,
      }}
    >
      {children}
    </ResponsesContext.Provider>
  );
};
