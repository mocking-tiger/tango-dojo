import Container from "@/components/Container";
import WordBox from "@/components/WordBox";
import { getWords } from "../page";

export default async function ChapterPage({
  params,
}: {
  params: { chapter: string; level: string };
}) {
  const { chapter, level } = await params;
  const wordsData = await getWords(level);
  const WORDS_PER_CHAPTER = 15;
  const chapterIndex = Number(chapter);

  const words = wordsData.slice(
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
