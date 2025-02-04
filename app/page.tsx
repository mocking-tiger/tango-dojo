import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import MainTitle from "@/components/MainTitle";

export default function Home() {
  return (
    <Container>
      <div className="w-fit m-auto">
        <MainTitle />
        <LoginForm />
      </div>
    </Container>
  );
}
