import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {UserItem} from "../components/UserItem";
import {FriendsHeader} from "../components/FriendsHeader";
import {useFriends} from "../context/FriendsContext";
import {userContext} from "../context/UserContext";
import PullToRefreshScrollView from "../components/PullToRefreshScrollView";
import {SearchBar} from "../components/SearchBar";

export const AddFriendsScreen = ({navigation}) => {
    const {allUsers, globalUserId} = userContext();
    const {
        friends,
        friendRequests,
        sendFriendRequest,
        isRefreshing,
        fetchFriendsAndRequests,
    } = useFriends();

    const [filteredUsers, setFilteredUsers] = useState(allUsers);

    const handleSearchChange = (query) => {
        const results = handleSearch(allUsers, query);
        setFilteredUsers(results);
    };

    useEffect(() => {
        if (allUsers && allUsers.length > 0) {
            let usersToFilter = [globalUserId];

            // Filter out users who are friends or have pending friend requests
            if (friends && friends.length > 0) {
                const filteredFriends = friends.map((friend) =>
                    friend.user_1_id === globalUserId
                        ? friend.user_2_id
                        : friend.user_1_id
                );

                usersToFilter = [...usersToFilter, ...filteredFriends];
            }

            if (friendRequests.Incoming && friendRequests.Incoming.length > 0) {
                const filteredIncomingFriendRequests = friendRequests.Incoming.map(
                    (request) =>
                        request.user_1_id === globalUserId
                            ? request.user_2_id
                            : request.user_1_id
                );
                usersToFilter = [...usersToFilter, ...filteredIncomingFriendRequests];
            }

            if (friendRequests.Sent && friendRequests.Sent.length > 0) {
                const filteredSentFriendRequests = friendRequests.Sent.map((request) =>
                    request.user_1_id === globalUserId
                        ? request.user_2_id
                        : request.user_1_id
                );
                usersToFilter = [...usersToFilter, ...filteredSentFriendRequests];
            }

            const finalFilteredUsers = allUsers.filter(
                (user) => !usersToFilter.includes(user.userId)
            );

            setFilteredUsers(finalFilteredUsers);
        }
    }, [allUsers, friends, friendRequests, globalUserId]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#291400"}}>
            <FriendsHeader/>
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>Add Friends</Text>
            </View>
            <PullToRefreshScrollView
                isRefreshing={isRefreshing}
                onRefresh={fetchFriendsAndRequests}
            >
                <ScrollView>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((item) => (
                            <UserItem
                                key={item.userId}
                                user={item}
                                onSendRequest={sendFriendRequest}
                                currentUserId={globalUserId}
                            />
                        ))
                    ) : (
                        <Text style={styles.bodyStyle}>No friends available</Text>
                    )}
                </ScrollView>
            </PullToRefreshScrollView>
            <SearchBar onSearch={handleSearchChange} isSearching={true}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerStyle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        marginVertical: 20,
        marginLeft: 20,
        color: "white",
    },
    bodyStyle: {
        fontSize: 20,
        color: "white",
        marginVertical: 10,
        marginLeft: 20,
    },
});
