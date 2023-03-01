import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import UserPanel from "../UserPanel";

const url = "knflkns/dnfkjnsd/this"
const make = () => {
    const urlArr = url.split("/");
    const page =
      urlArr[urlArr.length - 1].charAt(0).toUpperCase() +
      urlArr[urlArr.length - 1].slice(1);
      return page
}
it("should display the name of the subpage/outlet in h1", () => {
    render(
        <BrowserRouter>
            <UserPanel />
        </BrowserRouter>)
    const activeSubPage = screen.getByRole("heading")
    const url = make()
    
    expect(activeSubPage).toBe(url)
})