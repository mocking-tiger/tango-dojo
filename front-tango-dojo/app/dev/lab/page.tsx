"use client";

import { useAlert } from "@/hooks/useAlert";
import ApiTest from "../_components/ApiTest";
import TtsTest from "../_components/TtsTest";

export default function Laboratory() {
  const { show } = useAlert();
  return (
    <div>
      {/* <TtsTest /> */}
      {/* <ApiTest /> */}
      <button onClick={() => show("df", "alert", () => console.log("gd"))}>
        Alert
      </button>
      <button onClick={() => show("df", "confirm", () => console.log("gd"))}>
        Confirm
      </button>
    </div>
  );
}
