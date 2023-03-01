import { useState } from "react";
import { ReauthModal } from "../../../../common/utilities/utils";
import DisplayCards from "./components/DisplayCards";
import "./MyAccount.scss";

const MyAccount = () => {
  const [openReauthModal, setOpenReauthModal] = useState(false);

  return (
    <section className="myaccount">
      <DisplayCards setOpenReauthModal={setOpenReauthModal} />
      {openReauthModal && (
        <ReauthModal
          openReauthModal={openReauthModal}
          setOpenReauthModal={setOpenReauthModal}
          inputEmail=""
          deleteAccount={true}
        />
      )}
    </section>
  );
};

export default MyAccount;
