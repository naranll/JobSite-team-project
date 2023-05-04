// import "../styles/successmodal.scss";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

export default function SuccessModal(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUser } = useUserContext();
  const { setModal } = props;

  return (
    <>
      <div className="successModal">
        <div className="bgOpacity" onClick={() => setModal(false)} />
        <div className="success">
          <div className="body">
            <picture className="succeedImage">
              <img src="../image/succeedImage.png" alt="#" />
            </picture>
            <p className="userEmail">{currentUser?.email}</p>
            <p className="para">Congratulations </p>
          </div>
          <Link href={`../`}>
            <button className="applicationBtn">Go to my Application</button>
          </Link>
        </div>
      </div>
    </>
  );
}
