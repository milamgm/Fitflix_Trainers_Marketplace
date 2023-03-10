import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  getByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import PartnersList from "../PartnersList";
import ChatProvider, {
  ChatContext,
} from "../../../../../../application/context/ChatContext/ChatContext";

const mockPartners = [
  {
    partnerUid: "123",
    partnerName: "Alice",
    partnerPic: "",
  },
  {
    partnerUid: "456",
    partnerName: "Bob",
    partnerPic: "",
  },
  {
    partnerUid: "789",
    partnerName: "Charlie",
    partnerPic: "",
  },
];

render(<PartnersList />, {
  wrapper: ({ children }) => (
    <ChatContext.Provider
      value={{
        partnertsData: mockPartners,
        setActiveChat: () => {},
        activeChat: {
          partnerUid: "",
          partnerName: "",
          partnerPic: "",
        },
        userChats: [],
        displayMobilePartnersList: false,
        setDisplayMobilePartnersList: () => false,
      }}
    >
      {children}
    </ChatContext.Provider>
  ),
});

test("filters and displays chat partners by name", () => {
  const searchInput = screen.getByLabelText("searchInput");
  fireEvent.change(searchInput, { target: { value: "a" } });

  expect(screen.getByText("Alice")).toBeInTheDocument();
});
