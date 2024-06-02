import React, {createContext, useContext, useEffect, useState} from "react";

import axios from "axios";

import {userContext} from "./UserContext";
import {useToken} from "./TokenContext";

const ResponsesContext = createContext();

export const useResponses = () => useContext(ResponsesContext);

export const ResponsesProvider = ({children}) => {
    const {getToken} = useToken();
    const {globalUserId} = userContext();
    const [responseSubmitted, setResponseSubmitted] = useState(false);

    const [responses, setResponses] = useState(null);
    const [myResponse, setMyResponse] = useState(null);
    const [responsesFetchFinished, setResponsesFetchFinished] = useState(false);

    const fetchAllResponses = async () => {
        try {
            if (globalUserId) {
                const response = await axios.get(
                    `http://localhost:8080/response/get-friend-responses?userId=${globalUserId}`,
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

    useEffect(() => {
        if (globalUserId && responses && responses !== {}) {
            const userResponse = Object.values(responses).find(
                (response) => response.userId === globalUserId
            );
            if (userResponse) {
                setMyResponse(userResponse);
            }
            setResponsesFetchFinished(true); //triggers regardless if myResponse exists or not
        }
    }, [responses]);

    return (
        <ResponsesContext.Provider
            value={{
                responses,
                setResponses,
                responseSubmitted,
                setResponseSubmitted,
                myResponse,
                setMyResponse,
                responsesFetchFinished,
                fetchAllResponses,
            }}
        >
            {children}
        </ResponsesContext.Provider>
    );
};
