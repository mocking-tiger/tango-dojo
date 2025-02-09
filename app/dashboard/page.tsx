import Container from "@/components/Container";
import SelectLevelBox from "@/components/SelectLevelBox";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Container>
      <div className="h-full px-[50px] py-[50px] flex flex-col justify-between gap-[15px]">
        <Link className="h-full" href={"/dashboard/n5"}>
          <SelectLevelBox title="N5" />
        </Link>
        <Link className="h-full" href={"/dashboard/n4"}>
          <SelectLevelBox title="N4" />
        </Link>
        <Link className="h-full" href={"/dashboard/n3"}>
          <SelectLevelBox title="N3" />
        </Link>
        <Link className="h-full" href={"/dashboard/n2"}>
          <SelectLevelBox title="N2" />
        </Link>
        <Link className="h-full" href={"/dashboard/n1"}>
          <SelectLevelBox title="N1" />
        </Link>
      </div>
    </Container>
  );
}
