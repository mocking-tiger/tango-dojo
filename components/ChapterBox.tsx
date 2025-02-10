import { N5WORDS } from "@/utils/mock-data";

export default function ChapterBox({
  words,
  index,
}: {
  words: typeof N5WORDS;
  index: number;
}) {
  console.log(words);
  return (
    <article className="p-[20px] md:p-[50px] xl:p-[120px] flex justify-center items-center bg-white rounded-[15px] font-yuji cursor-pointer">
      <span className="text-[20px] md:text-[36px] xl:text-[48px]">
        第{index + 1}歩
      </span>
    </article>
  );
}
