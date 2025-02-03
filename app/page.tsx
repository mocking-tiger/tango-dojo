import Container from "@/components/Container";
import Input from "@/components/Input";
import MainTitle from "@/components/MainTitle";

export default function Home() {
  return (
    <Container>
      <div className="w-fit m-auto">
        <MainTitle />
        <form className="flex flex-col gap-[30px]">
          <Input title="이메일" />
          <Input title="비밀번호" />
        </form>
      </div>
    </Container>
  );
}
