import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const defaultCenter = [32.7876583, -115.423443];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={mapStyles}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultCenter}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
