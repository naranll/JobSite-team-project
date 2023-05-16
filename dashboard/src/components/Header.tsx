import BellLogo from "./icons/BellLogo";

export default function Header(): JSX.Element {
  const centerStyle = "flex justify-between items-center";
  return (
    <div className={`h-[80px] p-11 ${centerStyle} bg-white`}>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="flex gap-[20px]">
        <div className={centerStyle}>
          <BellLogo />
        </div>
        <span
          className={`${centerStyle} w-[40px] h-[40px] border-2 border-black rounded-full`}
        >
          img
        </span>
        <h6 className={centerStyle}>Administrator</h6>
      </div>
    </div>
  );
}
