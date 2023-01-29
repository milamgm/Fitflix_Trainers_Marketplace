import { useLocation } from "react-router-dom";
import { CreateAd } from "../../utilities/utils";
import "./CreateAd.scss"

const CreatePost = () => {
  const location = useLocation();
  let editData;
  if (location.state !== null) {
    editData = location.state;
  }

  return (
    <div className="page_body">
      <CreateAd editDataParams={editData} />
    </div>
  );
};

export default CreatePost;
