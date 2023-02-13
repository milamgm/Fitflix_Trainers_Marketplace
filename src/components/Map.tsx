import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { getGeocode, getLatLng, LatLng } from "use-places-autocomplete";
import { useAppContext } from "../context/AppContext";
import "../styles/components/Map.scss";

interface IMapProps {
  zone: string;
}
const Map = ({ zone }: IMapProps) => {
  const { isLoaded } = useAppContext();

  return (
    <>
      {isLoaded && <RunMap zone={zone} />}
      {!isLoaded && <h5>Map wird geladen...</h5>}
    </>
  );
};

export default Map;

const RunMap = ({ zone }: IMapProps) => {
  const [geocords, setGeocords] = useState<LatLng | undefined>();

  //Gets latitude and longitude from the specified location
  useEffect(() => {
    const getgeo = async () => {
      const results = await getGeocode({ address: zone });
      const { lat, lng } = await getLatLng(results[0]);
      setGeocords({ lat: Number(lat), lng: Number(lng) });
    };
    getgeo();
  }, []);

  return (
    <>
      <GoogleMap
        zoom={10}
        center={geocords}
        mapContainerClassName="mapContainer"
      ></GoogleMap>
    </>
  );
};
