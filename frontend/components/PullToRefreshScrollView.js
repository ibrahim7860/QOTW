import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";

const PullToRefreshScrollView = ({
                                     children,
                                     onRefresh,
                                     isRefreshing,
                                     ...props
                                 }) => {
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setRefreshing(isRefreshing);
    }, [isRefreshing]);

    const handleRefresh = () => {
        setRefreshing(true);

        // Call the onRefresh function passed as prop
        onRefresh && onRefresh();
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={"#ffffff"}
                />
            }
            {...props}
        >
            {children}
        </ScrollView>
    );
};

export default PullToRefreshScrollView;
