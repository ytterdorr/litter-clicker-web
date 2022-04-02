import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { imageNames } from '../../assets/images';
import './MapDisplay.css';
import './MapboxGL.css'; // copied official styling from https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css
import Images from '../../assets/images';

mapboxgl.accessToken = 'pk.eyJ1IjoieXR0ZXJkb3JyIiwiYSI6ImNreGk0dm54dDA3NHgyd281eHh4bm5ueWoifQ.V43vZ77_zZcM9bnZFx8l0Q';

const featureCollectionFromItemList = (itemList) => {
    // console.log("itemList", itemList)

    const featureCollection = {
        "type": "FeatureCollection",
        "features": []

    }

    const features = itemList.map((item, index) => {
        return {
            "type": 'Feature',
            "properties": {
                "id": `item${index}`,
                "name": item.name,
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [item.location.longitude, item.location.latitude]
            }
        };
    })


    featureCollection["features"] = features;

    return featureCollection
}


const MapDisplay = ({ data }) => {
    // Data is expected to be an itemList

    // Expects map points? Items? Something with coordinates
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.0840356);
    const [lat, setLat] = useState(37.4220065);
    const [zoom, setZoom] = useState(9);

    // The data comes in an odd object format. 
    const itemList = Object.entries(data).map(([index, item]) => item)
    const featureCollection = featureCollectionFromItemList(itemList)

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        // TODO: Should set dynamic center point
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        })
        map.current.on('load', () => {
            // Load data source
            map.current.addSource("itemsSource", {
                type: "geojson",
                data: featureCollection

            })

            // Add image layers
            Object.entries(Images).forEach(([imgName, imgData]) => {
                map.current.loadImage(imgData, (error, image) => {
                    if (error) {
                        throw error;
                    }
                    // Add image
                    map.current.addImage(imgName, image)
                    // Add layer
                    map.current.addLayer({
                        'id': `${imgName}Layer`,
                        'source': 'itemsSource',
                        'type': 'symbol',
                        'filter': ['==', 'name', imgName],
                        'layout': {
                            'icon-image': imgName, // reference the image
                            'icon-size': 0.25
                        }
                    })
                })
            })
        })

    })

    return (
        <div>
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
    )
}
export default MapDisplay;