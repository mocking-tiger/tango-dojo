export default function Input({ title }: { title: string }) {
  const getInputType = (title: string) => {
    if (title === "비밀번호" || title === "비밀번호 확인") {
      return "password";
    } else if (title === "이메일") {
      return "email";
    } else {
      return "text";
    }
  };

  return (
    <div className="w-full flex items-center gap-[10px]">
      <label
        className="text-[24px]"
        htmlFor={title.replace(/\s/g, "").toLowerCase()}
      >
        {title}
      </label>
      <input
        className="p-[10px] flex-grow bg-transparent border-b border-gray-400 focus:outline-none focus:border-black"
        id={title.replace(/\s/g, "").toLowerCase()}
        type={getInputType(title)}
      />
    </div>
  );
}
