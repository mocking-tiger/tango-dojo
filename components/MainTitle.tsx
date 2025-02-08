export default function MainTitle({ forHeader = false }) {
  if (forHeader) {
    return (
      <h1 className="h-full text-[30px] text-center tracking-[10px] font-yuji relative -top-1">
        単語道場
      </h1>
    );
  } else {
    return (
      <h1 className="pt-[100px] pb-[100px] text-[50px] md:text-[100px] xl:text-[150px] text-center font-yuji">
        単語道場
      </h1>
    );
  }
}
