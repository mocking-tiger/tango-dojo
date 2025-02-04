export default function MainTitle({ forHeader = false }) {
  if (forHeader) {
    return (
      <h1 className="나중에 헤더 만들고 사이즈에 맞게 스타일링">単語道場</h1>
    );
  } else {
    return (
      <h1 className="pt-[100px] pb-[100px] text-[50px] md:text-[100px] xl:text-[150px] text-center font-yuji">
        単語道場
      </h1>
    );
  }
}
