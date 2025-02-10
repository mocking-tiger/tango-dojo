import Container from "@/components/Container";

export default async function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const data = await params;

  return (
    <Container>
      <div>第{data.chapter}歩</div>
    </Container>
  );
}
