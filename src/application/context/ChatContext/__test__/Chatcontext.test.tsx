import { render, screen, waitFor } from "@testing-library/react";
import { t } from "i18next";
import ChatProvider from "../ChatContext";

test("renders chat provider", async () => {
  render(<ChatProvider><div>Child component</div></ChatProvider>);



})