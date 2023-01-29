import { useEffect } from "react";
import { Map, Card } from "../../utilities/utils";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./Search.scss";
import { IAdData } from "../../types/types";

const Search = () => {
  const location = useLocation();
  const searchResults =
    location.state === null
      ? { zone: "Berlin", category: "Badminton" }
      : location.state.searchResults;
  const [adsData, setAdsData] = useState<IAdData[]>([]);

  useEffect(() => {
    const getAdsData = async (zone: string, category: string) => {
      const locality = zone.split(",").slice(-2)[0];
      const docRef = doc(db, "ads_collection", locality);
      onSnapshot(docRef, (doc) => {
        const data = doc.data();
        const adsArr = data !== undefined ? Object.values(data) : [];

        const adsWithCategory = adsArr.filter((ad) =>
          ad.categories.includes(category)
        );
        setAdsData(adsWithCategory);
      });
    };
    getAdsData(searchResults.zone, searchResults.category);
  }, []);

  return (
    <div className="search">
      <div className="map">
        <Map zone={searchResults.zone} />
      </div>
      <div className="page_body">
        <h1>
          {adsData.length} {searchResults.category} Trainer in der Nähe von{" "}
          {searchResults.zone}
        </h1>
        <div className="filter_div">
          <button>Neueste zuerst</button>
          <button>Günstigste zuerst</button>
        </div>
        <section className="results">
          {adsData.length >= 1 &&
            adsData.map((data) => <Card key={data.id} {...data} />)}
        </section>
      </div>
    </div>
  );
};

export default Search;
