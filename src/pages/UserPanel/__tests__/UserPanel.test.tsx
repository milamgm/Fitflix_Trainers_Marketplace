import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserPanel from "../UserPanel";

const MockUserPanel = () => {
  return (
    <BrowserRouter>
      <UserPanel />
    </BrowserRouter>
  );
};

describe("UserPanel menu", () => {
  test("renders the menu links and highlights the active link. Displays the page with the corresponding heading", () => {
    render(<MockUserPanel />);

    const linksArr = screen.getAllByRole("link");

    linksArr.forEach((link) => {
      fireEvent.click(link);
      if (link.innerHTML !== "Nachrichten") {
        expect(link).toHaveClass("menu_btn active_btn");
        expect(screen.getByRole("heading")).toHaveTextContent(link.innerHTML);
      } else {
        expect(link).toHaveClass("menu_btn active_btn");
      }
    });
  });
});
