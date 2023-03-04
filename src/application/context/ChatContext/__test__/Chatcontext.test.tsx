import { render, screen, waitFor } from "@testing-library/react";
import { t } from "i18next";
import ChatProvider from "../ChatContext";

test("renders chat provider", async () => {
  render(<ChatProvider><div>Child component</div></ChatProvider>);

<<<<<<< HEAD


})
=======
  // Wait for initial Firebase snapshot to complete
  await waitFor(() => expect(screen.getByText("Child component")).toBeInTheDocument());


  // Assert that initial chat data has been fetched and set correctly
 const text = t("chat.messagesPage.noChats")
  expect(screen.getByText(text)).toBeInTheDocument(); // Assuming no user chats exist
});
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
