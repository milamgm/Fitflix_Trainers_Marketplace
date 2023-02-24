import { toast } from "react-hot-toast";
import categories from "../data/categories.json"

export const handleSearch = (category: string, zone: string, navigate: any) => {
  
  const searchResults = { category: category, zone: zone };
  const categoryExists = categories.includes(category);
  if ((categoryExists || category === "") && zone !== "") {
    navigate("/search", { replace: true, state: { searchResults } });
  } else {
    if (!categoryExists && category !== "")
      toast.error("Bitte wählen Sie eine Kategorie aus");
    if (zone === "") toast.error("Bitte wählen Sie einen Bereich aus");
  }
};
