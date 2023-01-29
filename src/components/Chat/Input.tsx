import { addToDB } from "../../api/AddToDB";
const Input = () => {
  const handleSend = () =>{
    addToDB("hola", "quetal" , {})
  }
  return (
    <div className="input">
      <input type="text" placeholder="Schreiben Sie etwas..." />
      <div className="send">
        <img src="/image.svg" alt="" />
        <input type="file" style={{ display: "none" }} name="" id="" />
        <label htmlFor="file">
          <img src="/attach.svg" alt="" />
        </label>
        <img className="send_btn" onClick={handleSend} src="/send.svg" alt="" />
      </div>
    </div>
  );
};

export default Input;
