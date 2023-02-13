import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

interface IPlacesAutocompleteProps {
  setZone: React.Dispatch<React.SetStateAction<string>>;
}

const PlacesAutocomplete = ({ setZone }: IPlacesAutocompleteProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();
  const [active, setActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  //Open it closes dropdown if an option has been selected or if this exists or not
  useEffect(() => {
    if (isSelected) {
      setActive(false);
    } else {
      setActive(data?.length > 0 || data !== undefined);
    }
  }, [data[0], isSelected]);

  return (
    <div className="dropdown">
      <div className="form__field">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsSelected(false);
          }}
          disabled={!ready}
          className="form__input"
          placeholder="Berlin"
        />
      </div>

      {active && status === "OK" && (
        <div className="dropdown__body box-shadow">
          <div>
            {data.map(({ place_id, description }) => (
              <div
                key={place_id}
                onClick={() => {
                  setValue(` ${description}`);
                  setZone(description);
                  setIsSelected(true);
                }}
                className="dropdown__option "
              >
                {description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
