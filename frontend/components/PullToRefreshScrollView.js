import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";

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
          colors={["#0000ff"]} // Customize the refresh indicator color
          progressBackgroundColor="#ffffff" // Customize the background color of the refresh indicator
        />
      }
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default PullToRefreshScrollView;
