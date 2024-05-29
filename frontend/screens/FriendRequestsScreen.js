import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {FriendItem} from "../components/FriendItem";
import {Button} from "../components/Button";
import {SearchBar} from "../components/SearchBar";
import {useFriends} from "../context/FriendsContext";
import {FriendsHeader} from "../components/FriendsHeader";
import {userContext} from "../context/UserContext";

export const FriendRequestsScreen = ({navigation}) => {
    const {
        friendRequests,
        rejectFriendRequest,
        acceptFriendRequest,
        cancelFriendRequest,
        handleSearch,
    } = useFriends();

    const [filteredIncomingRequests, setFilteredIncomingRequests] = useState([]);
    const [filteredSentRequests, setFilteredSentRequests] = useState([]);

    const {globalUserId} = userContext();

    const handleSearchChange = (query) => {
        const results = handleSearch(friendRequests, query);
        setFilteredIncomingRequests(results);
    };

    useEffect(() => {
        setFilteredIncomingRequests(friendRequests["Incoming"]);
        setFilteredSentRequests(friendRequests["Sent"]);
    }, [friendRequests]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#291400"}}>
            <FriendsHeader/>
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>Incoming Requests</Text>
            </View>
            <ScrollView>
                {filteredIncomingRequests.map((item) => (
                    <FriendItem
                        key={item.friendship_id}
                        friend={item}
                        onRejectRequest={() => rejectFriendRequest(item.friendship_id)}
                        onAcceptRequest={() => acceptFriendRequest(item.friendship_id)}
                        isIncomingRequest={true}
                        isSentRequest={false}
                        currentUserId={globalUserId}
                    />
                ))}
            </ScrollView>
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>Sent Requests</Text>
            </View>
            <ScrollView>
                {filteredSentRequests.map((item) => (
                    <FriendItem
                        key={item.friendship_id}
                        friend={item}
                        onCancelRequest={() => cancelFriendRequest(item.friendship_id)}
                        isIncomingRequest={false}
                        isSentRequest={true}
                        currentUserId={globalUserId}
                    />
                ))}
            </ScrollView>
            <SearchBar onSearch={handleSearchChange}/>
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
});
