import React, { createContext, useContext, useState, useEffect } from "react";
import { userContext } from "./UserContext";
import { useToken } from "./TokenContext";

import axios from "axios";

const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
  const [questionText, setQuestionText] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const { getToken } = useToken();
  const { globalUserId } = userContext();

  const fetchQuestion = async () => {
    axios
      .get(`http://localhost:8080/question/get-question`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then((response) => {
        setQuestionText(response.data.questionText);
        setQuestionId(response.data.questionId);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  useEffect(() => {
    if (globalUserId) {
      fetchQuestion();
    }
  }, [globalUserId]);

  return (
    <QuestionContext.Provider
      value={{
        questionText,
        questionId,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
