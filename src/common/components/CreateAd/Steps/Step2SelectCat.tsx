import React, { useEffect } from "react";
import categoriesJSON from "../../../data/categories.json";
import { AiOutlineClose } from "react-icons/ai";
import { TUpdateFields } from "../../../types/types";
import { useAppContext } from "../../../utilities/utils";

interface IStep2SelectCatProps {
  categories: string[];
  updateFields: TUpdateFields;
  setActiveNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step2SelectCat = ({
  categories,
  updateFields,
  setActiveNextBtn,
}: IStep2SelectCatProps) => {
  const { t } = useAppContext();

  //Removes category from category array
  const removeCategory = (newCategory: string) => {
    updateFields({
      categories: categories.filter((category) => category !== newCategory),
    });
  };
  //Adds or removes a category in the array
  const handleSelect = (newCategory: string) => {
    if (!categories.includes(newCategory)) {
      updateFields({
        categories: [...categories, newCategory],
      });
    } else {
      removeCategory(newCategory);
    }
  };
  //Activates forward button when at least one category is selected
  useEffect(() => {
    setActiveNextBtn(categories[0] !== undefined);
  }, [categories[0]]);

  return (
    <div className="step">
      <div className="step_title">
        <h1>
          {t("steps.step2.title.other1")}
          <span>{t("steps.step2.title.span")}</span>
          {t("steps.step2.title.other2")}
        </h1>
      </div>
      <div className="selected_categories_div">
        {categories?.map((category) => (
          <div key={category} className="selected_category">
            {category}
            <div
              className="remove_category"
              onClick={() => removeCategory(category)}
            >
              <AiOutlineClose />
            </div>
          </div>
        ))}
      </div>
      <div className="checkbox_div">
        {categoriesJSON.map((categoryJSON) => (
          <div
            key={categoryJSON}
            className={`checkbox_card ${
              categories.includes(categoryJSON) ? "selected" : ""
            }`}
            onClick={() => handleSelect(categoryJSON)}
          >
            <label htmlFor={categoryJSON}> {categoryJSON}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2SelectCat;
