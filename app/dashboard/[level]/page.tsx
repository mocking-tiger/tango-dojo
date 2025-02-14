import ChapterBox from "@/components/ChapterBox";
import Container from "@/components/Container";
import { N5WORDS } from "@/utils/mock-data";

export async function getWords(level: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/words/${level}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        console.log("데이터가 존재하지 않습니다.");
        return [];
      }

      // 기타 오류 처리
      throw new Error(`서버 오류: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default async function LevelPage({
  params,
}: {
  params: { level: string };
}) {
  const { level } = await params;
  const words = await getWords(level);
  // console.log(words);
  const WORDS_PER_PAGE = 15;
  const chunkArray = (arr: typeof N5WORDS, size: number) => {
    // 배열의 총 길이를 한 배열당 갖게하려는 요소의 수로 나눔
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      // arr.length/15 === 2;
      // 첫번째 빈 배열에는 arr.slice(0*15,0*15+15) => 0~14번 인덱스까지(15개)
      // 두번째 빈 배열에는 arr.slice(1*15,1*15+15) => 15~29번 인덱스까지(15개)
      // 근데 ChapterBox 컴포넌트가 단어들에 대한 정보를 가지고있을 필요는 없어서 안해도 되긴함., 학습용으로 남겨둠
      arr.slice(i * size, i * size + size)
    );
  };

  const wordChunks = chunkArray(words, WORDS_PER_PAGE);
  // console.log(wordChunks);

  return (
    <Container>
      <section className="px-[30px] xl:px-[100px] py-[50px] grid grid-cols-2 gap-[30px]">
        {wordChunks.length === 0 ? (
          <div>이 레벨은 현재 준비중입니다.</div>
        ) : (
          wordChunks.map((word, i) => (
            <ChapterBox key={i} words={word} index={i} />
          ))
        )}
      </section>
    </Container>
  );
}
