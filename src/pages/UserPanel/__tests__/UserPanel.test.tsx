import { render, screen } from "@testing-library/react";
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

describe("UserPanel", () => {
  test("renders the menu links and highlights the active link", () => {
    render(<MockUserPanel />);

    // Comprobar que los enlaces del menú se están renderizando correctamente
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Nachrichten")).toBeInTheDocument();
    expect(screen.getByText("Konto")).toBeInTheDocument();

    // Comprobar que el enlace activo se está resaltando
    expect(screen.getByText("Dashboard")).toHaveClass("active_btn");

    // Hacer clic en otro enlace del menú y comprobar que se resalta
    fireEvent.click(screen.getByText("Nachrichten"));
    expect(screen.getByText("Nachrichten")).toHaveClass("active_btn");
  });
});
