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
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [responses, setResponses] = useState(null);
    const [myResponse, setMyResponse] = useState(null);
    const [responsesFetchFinished, setResponsesFetchFinished] = useState(false);

    const fetchFriendsResponses = async () => {
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

    const refreshResponses = async () => {
        if (globalUserId) {
            try {
                setIsRefreshing(true);
                await fetchFriendsResponses();
            } catch (error) {
                console.error("Error during fetchResponses:", error);
            } finally {
                setIsRefreshing(false); // Set refreshing to false when the refresh operation is done
            }
        }
    };

    useEffect(() => {
        if (globalUserId) {
            fetchFriendsResponses();
        }
    }, [globalUserId]);

    const fetchMyResponse = async () => {
        if (globalUserId && responses) {
            const userResponse = Object.values(responses).find(
                (response) => response.userId === globalUserId
            );
            if (userResponse) {
                setMyResponse(userResponse);
            }
            setResponsesFetchFinished(true); //triggers regardless if myResponse exists or not
        }
    };

    useEffect(() => {
        fetchMyResponse();
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
                refreshResponses,
                isRefreshing,
            }}
        >
            {children}
        </ResponsesContext.Provider>
    );
};
