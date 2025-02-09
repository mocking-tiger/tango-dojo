import Container from "@/components/Container";
import SelectLevelBox from "@/components/SelectLevelBox";

export default function Dashboard() {
  return (
    <Container>
      <div className="h-full px-[50px] py-[50px] flex flex-col justify-between gap-[15px]">
        <SelectLevelBox title="N5" />
        <SelectLevelBox title="N4" />
        <SelectLevelBox title="N3" />
        <SelectLevelBox title="N2" />
        <SelectLevelBox title="N1" />
      </div>
    </Container>
  );
}
