import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";

const Map = () => {
  const { lat, lon } = { lat: 128.6738573, lon: 35.8778522 };
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(lon, lat)}
        defaultZoom={15}
        draggable={false}
        pinchZoom={false}
        scrollWheel={false}
        keyboardShortcuts={false}
      >
        <Marker defaultPosition={new navermaps.LatLng(lon, lat)} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
