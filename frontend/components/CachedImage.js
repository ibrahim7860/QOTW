import React, {useEffect, useState} from 'react';
import {Image} from 'expo-image';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';

const CachedImage = ({uri, style, defaultImage}) => {
    const [source, setSource] = useState(defaultImage);

    useEffect(() => {
        const fetchImage = async () => {
            if (!uri) {
                return;
            }

            const name = shorthash.unique(uri);
            const path = `${FileSystem.cacheDirectory}${name}`;

            const image = await FileSystem.getInfoAsync(path);
            if (image.exists) {
                console.log('Loading image from cache');
                setSource({uri: image.uri});
                return;
            }

            console.log('Downloading image to cache');
            try {
                const newImage = await FileSystem.downloadAsync(uri, path);
                setSource({uri: newImage.uri});
            } catch (error) {
                console.error('Failed to download image', error);
                setSource(defaultImage); // Fallback to default image in case of an error
            }
        };

        fetchImage();
    }, [uri]);

    return <Image source={source} style={style}/>;
};

export default CachedImage;