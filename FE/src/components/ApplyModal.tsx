// import "../styles/applied.scss";
import Link from "next/link";

export default function ApplyModal(props: {
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setApply } = props;

  return (
    <>
      <div>hellomodal</div>
      <div className="successModal">
        <div className="bgOpacity" />
        <div className="success">
          <picture className="succeedImage">
            <img src="../image/succeedImage.png" alt="#" />
          </picture>
          <div className="body">
            <p className="para">Congratulations </p>
          </div>
          <Link
            href={`/`}
            className="applicationBtn"
            onClick={() => setApply(false)}
          >
            <button>Go to my Application</button>
          </Link>
        </div>
      </div>
    </>
  );
}
