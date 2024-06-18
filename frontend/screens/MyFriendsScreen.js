import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {FriendItem} from "../components/FriendItem";
import {SearchBar} from "../components/SearchBar";
import {FriendsHeader} from "../components/FriendsHeader";
import {useFriends} from "../context/FriendsContext";
import {userContext} from "../context/UserContext";
import PullToRefreshScrollView from "../components/PullToRefreshScrollView";

export const MyFriendsScreen = ({navigation}) => {
    const {
        friends,
        removeFriend,
        handleSearch,
        fetchFriendsAndRequests,
        isRefreshing,
    } = useFriends();
    const {globalUserId} = userContext();
    const [filteredFriends, setFilteredFriends] = useState(friends);
    const searchBarRef = useRef(null);

    const handleSearchChange = (query) => {
        const results = handleSearch(friends, query);
        setFilteredFriends(results);
    };

    const clearSearchBar = () => {
        if (searchBarRef.current) {
            searchBarRef.current.clear(); // Call clearInput function from SearchBar
        }
        setFilteredFriends([]); // This function clears the search bar
    };

    useEffect(() => {
        setFilteredFriends(friends);
    }, [friends]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#291400"}}>
            <FriendsHeader/>
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>My Friends</Text>
            </View>
            <PullToRefreshScrollView
                onRefresh={fetchFriendsAndRequests}
                isRefreshing={isRefreshing}
            >
                <ScrollView>
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map((item) => (
                            <FriendItem
                                key={item.friendship_id}
                                friend={item}
                                onRemove={() => removeFriend(item.friendship_id)}
                                isIncomingRequest={false}
                                isSentRequest={false}
                                isFriend={true}
                                currentUserId={globalUserId}
                                clearSearchBar={clearSearchBar}
                            />
                        ))
                    ) : (
                        <Text style={styles.bodyStyle}>No friends added</Text>
                    )}
                </ScrollView>
            </PullToRefreshScrollView>

            <SearchBar onSearch={handleSearchChange} isSearching={false} searchBarRef={searchBarRef}/>
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
        marginVertical: 20,
        marginLeft: 20,
        color: "white",
        fontWeight: "bold",
    },
    bodyStyle: {
        fontSize: 20,
        color: "white",
        marginVertical: 10,
        marginLeft: 20,
    },
});
