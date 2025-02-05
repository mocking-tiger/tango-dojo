export default function Input({
  title,
  onChange,
  name = "default",
  maxLength = 30,
  minLength = 2,
}: {
  title: string;
  onChange: (title: string, value: string) => void;
  name?: string;
  maxLength?: number;
  minLength?: number;
}) {
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
        className="w-[100px] md:w-[133px] text-[18px] md:text-[24px]"
        htmlFor={title.replace(/\s/g, "").toLowerCase()}
      >
        {title}
      </label>
      <input
        className="p-[10px] flex-grow bg-transparent border-b border-gray-400 focus:outline-none focus:border-black"
        id={title.replace(/\s/g, "").toLowerCase()}
        name={name}
        type={getInputType(title)}
        onChange={(e) => onChange(name, e.target.value)}
        maxLength={maxLength}
        minLength={minLength}
        required
      />
    </div>
  );
}
