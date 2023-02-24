import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";

const useMapsAPILoader = () => {
  const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
    region: "de",
    language: "de",
  });

  return{ isLoaded };
};

export default useMapsAPILoader;
