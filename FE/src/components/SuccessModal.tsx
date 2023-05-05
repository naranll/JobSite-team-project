import Link from "next/link";

export default function SuccessModal(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setModal } = props;
  console.log(setModal);

  return (
    <>
      <div className="successModal">
        <div className="bgOpacity" />
        <div className="success">
          <div className="body">
            <picture className="succeedImage">
              <img src="../image/succeedImage.png" alt="#" />
            </picture>
            <p className="para">Congratulations </p>
          </div>
          <Link href={`../`}>
            <button className="applicationBtn">Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
