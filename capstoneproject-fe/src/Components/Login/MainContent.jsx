import AuthForm from "./AuthForm";
import swimImg from "../../assets/login/swim.jpg"
import "../../Styles/Login/MainContent.css"

export default function MainContent() {
  return (
    <main className="LoginMain-content">
      <div className="LoginPicture">
        <img src={swimImg} alt="swimming" />
      </div>
      <AuthForm />
    </main>
  );
}