export default function SelectLevelBox({ title }: { title: string }) {
  return (
    <section className="h-full px-[20px] flex justify-between items-center border rounded-[15px] bg-white cursor-pointer font-yuji shadow-md hover:-translate-y-1 transition-all ease-in-out">
      <h2 className="text-[48px]">{title}</h2>
      <span className="text-[36px]">0%</span>
    </section>
  );
}
