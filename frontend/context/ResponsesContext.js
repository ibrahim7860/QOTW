import React, {createContext, useContext, useState} from "react";
import defaultProfilePic from "../../assets/default.jpeg";

const ResponsesContext = createContext();

export const useResponses = () => useContext(ResponsesContext);

export const ResponsesProvider = ({ children }) => {
  const [globalUserId, setGlobalUserId] = useState(null);
  const [globalFullName, setGlobalFullName] = useState("");
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  const [responses, setResponses] = useState([
    {
      id: "1",
      fullName: "Uzair Qureshi",
      username: "fat_guy",
      profilePicUri: defaultProfilePic,
      userResponse: "Palestine, ",
    },
    {
      id: "2",
      fullName: "Ibrahim Ahmed",
      username: "yourdad",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "3",
      fullName: "Nayeem Belal",
      username: "dababy1212",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "4",
      fullName: "John Doe",
      username: "john_doe",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "5",
      fullName: "Jane Doe",
      username: "jane_doe",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "6",
      fullName: "Big Man",
      username: "big_man",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "7",
      fullName: "Gangatron Rex",
      username: "gang_rex",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "8",
      fullName: "Saad Syed",
      username: "saad_syed",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "9",
      fullName: "Silly Sully",
      username: "silly_sully",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
    {
      id: "10",
      fullName: "Zubi Goat",
      username: "zubi_goat",
      profilePicUri: defaultProfilePic,
      userResponse:
        "Palestine, a region in Western Asia, holds profound historical and cultural significance. Encompassing parts of modern Israel and the Palestinian territories of the West Bank and Gaza Strip, it has been a crossroads of religion, culture, and politics. Historically known as the land of the Philistines, it has witnessed diverse.",
    },
  ]);

  const [myResponse, setMyResponse] = useState({
    id: "10",
    fullName: "Nayeem Belal",
    username: "nabansnd",
    profilePicUri: defaultProfilePic,
    userResponse: null
  });

  const updateResponse = (response) => {
    setMyResponse((prevState) => ({
      ...prevState,
      userResponse: response.data.responseText,
    }));
  };

  const updateProfilePicUri = (photoUri) => {
    setMyResponse((prevState) => ({
      ...prevState,
      profilePicUri: photoUri,
    }));
  }

  const updateFullName = (fullName) => {
    setMyResponse((prevState) => ({
      ...prevState,
      profilePicUri: fullName,
    }));
  }

  return (
    <ResponsesContext.Provider
      value={{ responses, myResponse, updateResponse, updateProfilePicUri, updateFullName, globalUserId, setGlobalUserId, responseSubmitted,
      setResponseSubmitted, globalFullName, setGlobalFullName}}
    >
      {children}
    </ResponsesContext.Provider>
  );
};
