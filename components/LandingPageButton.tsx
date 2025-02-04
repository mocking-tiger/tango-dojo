"use client";

import { MouseEvent } from "react";

export default function LandingPageButton({
  title,
  onClick,
}: {
  title: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className="text-[24px] md:text-[36px] xl:text-[48px] hover:scale-[1.2] transition-all ease-in-out"
      name={title}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
