import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {userContext} from "./UserContext";
import {useToken} from "./TokenContext";

const FriendsContext = createContext();

export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({children}) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const {getToken} = useToken();
    const {globalUserId, refreshUsers, sendNotification} = userContext();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchFriends = async () => {
        try {
            if (globalUserId) {
                const response = await axios.get(
                    `http://localhost:8080/friends/${globalUserId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                setFriends(response.data);
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            if (globalUserId) {
                const response = await axios.get(
                    `http://localhost:8080/friends/requests/${globalUserId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                setFriendRequests(response.data);
            }
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    };

    useEffect(() => {
        if (globalUserId) {
            fetchFriends();
            fetchFriendRequests();
        }
    }, [globalUserId]);

    const fetchFriendsAndRequests = async () => {
        if (globalUserId) {
            try {
                setIsRefreshing(true); // Set refreshing to true before starting the refresh operation
                await fetchFriends();
                await fetchFriendRequests();
            } catch (error) {
                console.error("Error during fetchFriendsAndRequests:", error);
            } finally {
                setIsRefreshing(false);
            }
        }
    };

    const sendFriendRequest = async (newFriend) => {
        try {
            if (globalUserId) {
                const response = await axios.put(
                    `http://localhost:8080/friends/requests/sendFriendRequest`,
                    newFriend,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                if (response.status === 200) {
                    await sendNotification(
                        newFriend.user_2_id,
                        "Friend Request",
                        "You have a new friend request from " + newFriend.user_1_id
                    );
                }

                fetchFriendRequests();
                refreshUsers();
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const removeFriend = async (friendship_id) => {
        try {
            if (globalUserId) {
                const response = await axios.delete(
                    `http://localhost:8080/friends/delete/${friendship_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                fetchFriends();
            }
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    const acceptFriendRequest = async (friendship_id) => {
        try {
            if (globalUserId) {
                const response = await axios.put(
                    `http://localhost:8080/friends/requests/acceptRequest/${friendship_id}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                fetchFriends();
                fetchFriendRequests();
            }
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const rejectFriendRequest = async (friendship_id) => {
        try {
            if (globalUserId) {
                const response = await axios.delete(
                    `http://localhost:8080/friends/requests/reject/${friendship_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                fetchFriends();
            }
        } catch (error) {
            console.error("Error removing friend request:", error);
        }
    };

    const cancelFriendRequest = async (friendship_id) => {
        try {
            if (globalUserId) {
                const response = await axios.delete(
                    `http://localhost:8080/friends/requests/cancel/${friendship_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${await getToken()}`,
                        },
                    }
                );
                fetchFriendRequests();
            }
        } catch (error) {
            console.error("Error cancelling friend request:", error);
        }
    };

    const handleSearch = (array, query) => {
        if (query.trim() === "") {
            return array;
        } else {
            return array.filter(
                (friend) =>
                    friend.user_1_id.toLowerCase().includes(query.toLowerCase()) ||
                    friend.user_2_id.toLowerCase().includes(query.toLowerCase())
            );
        }
    };

    return (
        <FriendsContext.Provider
            value={{
                friends,
                sendFriendRequest,
                removeFriend,
                friendRequests,
                rejectFriendRequest,
                cancelFriendRequest,
                acceptFriendRequest,
                handleSearch,
                fetchFriendsAndRequests,
                isRefreshing,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};
