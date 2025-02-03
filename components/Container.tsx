import { ReactNode } from "react";

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/floor.jpg')] bg-center bg-cover">
      <main className="w-[1024px] h-full m-auto bg-[url('/paper.jpg')]  bg-center bg-cover">
        {children}
      </main>
    </div>
  );
}
