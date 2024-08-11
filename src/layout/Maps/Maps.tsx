import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";

const Maps = () => {
  const { lat, lon } = { lat: 127.0497041, lon: 37.5044068 };
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: "300px",
        height: "300px",
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(lon, lat)}
        defaultZoom={18}
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

export default Maps;
