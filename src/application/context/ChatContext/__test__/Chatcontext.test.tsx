import { render } from "@testing-library/react";
import ChatProvider from "../ChatContext";

test("renders chat provider", async () => {
  render(<ChatProvider><div>Child component</div></ChatProvider>);



})
