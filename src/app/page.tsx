"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("Hello world from another site!");
    console.log();
    alert("test alert");

    window.addEventListener(
      "message",
      (event) => {
        if (
          !["https://multinite.com", "http://localhost:3000"].includes(
            event.origin
          )
        )
          return;

        console.log("message received", event);
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
