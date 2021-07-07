import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={0}
      scrollWheelZoom={false}
      //   style={{ height: 400, width: "512" }}
      style={{ height: "100vh", width: "100wh" }}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        tileSize={512}
        noWrap={true}
        url="https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
