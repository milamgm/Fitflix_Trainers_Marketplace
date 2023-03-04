import { render, screen, fireEvent, getByLabelText, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../Sidebar";
import ChatProvider, { ChatContext } from "../../../../../../application/context/ChatContext/ChatContext";

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
    }
]

render(
    <Sidebar />, {
    wrapper: ({ children }) => (
<<<<<<< HEAD
        <ChatContext.Provider value={{
            partnertsData: mockPartners, setActiveChat: () => { }, activeChat: {
                partnerUid: "",
                partnerName: "",
                partnerPic: "",
            }, userChats: []
        }}>
=======
        <ChatContext.Provider value={{ partnertsData: mockPartners, setActiveChat: () => { }, activeChat: {} }}>
>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956
            {children}
        </ChatContext.Provider>
    )
})

test("filters and displays chat partners by name", () => {

    const searchInput = screen.getByLabelText("searchInput")
    fireEvent.change(searchInput, { target: { value: "a" } })

    expect(screen.getByText("Alice")).toBeInTheDocument()
})