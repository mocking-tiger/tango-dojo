import MainTitle from "./MainTitle";

export default function Header() {
  return (
    <header className="w-full h-[40px] absolute bg-white shadow-lg">
      <MainTitle forHeader />
      <div className="mr-[20px] absolute top-[5px] right-0">
        프로필 들어갈 곳
      </div>
    </header>
  );
}
