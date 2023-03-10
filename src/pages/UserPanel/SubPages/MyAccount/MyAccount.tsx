import { useState } from "react";
import { ReauthModal } from "../../../../common/utilities/utils";
import DisplayCards from "./components/DisplayCards";
import "./MyAccount.scss";

const MyAccount = () => {
  const [openReauthModal, setOpenReauthModal] = useState(false);

  return (
    <div className="myaccount">
      <section>
        <DisplayCards setOpenReauthModal={setOpenReauthModal} />
      </section>
      {openReauthModal && (
        <ReauthModal
          openReauthModal={openReauthModal}
          setOpenReauthModal={setOpenReauthModal}
          inputEmail=""
          deleteAccount={true}
        />
      )}
    </div>
  );
};

export default MyAccount;
