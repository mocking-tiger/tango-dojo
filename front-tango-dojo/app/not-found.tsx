import Container from "@/components/Container";
import Image from "next/image";

export default function NotFound() {
  return (
    <Container>
      <div className="w-full h-full font-yuji flex flex-col justify-center items-center gap-[60px]">
        <Image
          className="rounded-full"
          src="/dogeza.jpg"
          alt="dogeza-image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "350px", height: "auto" }}
          priority
        />
        <h1 className="text-[20px] md:text-[36px] xl:text-[48px]">
          お探しのページは見つかりませんでした。
        </h1>
      </div>
    </Container>
  );
}
