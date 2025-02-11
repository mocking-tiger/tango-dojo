import Container from "@/components/Container";
import WordBox from "@/components/WordBox";
import { N5WORDS } from "@/utils/mock-data";

export default async function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const data = await params;
  const WORDS_PER_CHAPTER = 15;
  const chapterIndex = Number(data.chapter);

  const words = N5WORDS.slice(
    (chapterIndex - 1) * WORDS_PER_CHAPTER,
    chapterIndex * WORDS_PER_CHAPTER
  );

  // console.log(words);

  return (
    <Container>
      <div className="w-full h-full flex justify-center items-center">
        <WordBox words={words} />
      </div>
    </Container>
  );
}
