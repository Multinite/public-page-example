"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("Hello world from another site!");

    window.addEventListener(
      "message",
      (event) => {
        if (
          !["https://multinite.com", "http://localhost:3000"].includes(
            event.origin
          )
        )
          return;
        const data = JSON.parse(event.data);
        console.log("message received", data);
      },
      false
    );
  }, []);

  return (
    <div className="text-primary bg-background">
      hello world! - testing alert
    </div>
  );
}
