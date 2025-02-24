"use client";

import { useState } from "react";

export default function ApiTest() {
  const [response, setResponse] = useState("");

  const testPost = async () => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "jyp5@jyp.com",
          name: "회원5",
          password: "123456",
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      console.log("test post error", e);
    }
  };

  return (
    <div>
      <button onClick={testPost}>POST 요청</button>
      <div>
        <h1>요청 결과</h1>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
