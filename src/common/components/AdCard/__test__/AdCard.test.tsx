import AdCard from "../AdCard";
import { render, screen } from "@testing-library/react";
import { IAdData } from "../../../types/types";
import { BrowserRouter } from "react-router-dom";

const data: IAdData = {
    aid: "dio32d",
    uid: "dio32d",
    title: "dio32d",
    categories: ["dio32d"],
    description: "dio32d",
    about: "dio32d",
    location: "dio32d",
    available: ["dio32d"],
    price: 3424,
    phone: 3242,
    photo: "dio32d",
}

describe("test", () => {
    const hola = "Hooola"
    it("checks if exists", () => {
       /*  render(
            <BrowserRouter>
                <AdCard data={data} />
            </BrowserRouter>) */
    })

})