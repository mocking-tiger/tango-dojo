import ChapterBox from "@/components/ChapterBox";
import Container from "@/components/Container";
import { N5WORDS } from "@/utils/mock-data";

export default function N5() {
  const chunkArray = (arr: typeof N5WORDS, size: number) => {
    // 배열의 총 길이를 한 배열당 갖게하려는 요소의 수로 나눔
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      // arr.length/15 === 2;
      // 첫번째 빈 배열에는 arr.slice(0*15,0*15+15) => 0~14번 인덱스까지(15개)
      // 두번째 빈 배열에는 arr.slice(1*15,1*15+15) => 15~29번 인덱스까지(15개)
      arr.slice(i * size, i * size + size)
    );
  };

  const wordChunks = chunkArray(N5WORDS, 15);
  // console.log(wordChunks);

  return (
    <Container>
      <section className="px-[30px] xl:px-[100px] py-[50px] grid grid-cols-2 gap-[30px]">
        {wordChunks.map((word, i) => (
          <ChapterBox key={i} words={word} index={i} />
        ))}
      </section>
    </Container>
  );
}
