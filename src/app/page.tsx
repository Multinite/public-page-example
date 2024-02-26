"use client";
import { useEffect } from "react";
//@ts-ignore
import type { PPC_messageType } from "./../../../../multinite-server/src/app/components/_mainNav/PPC";

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
        const data: PPC_messageType = JSON.parse(event.data);

        if (data.type === "init") {
          const cssLink = document.createElement("link");
          cssLink.href = data.css_path;
          cssLink.rel = "stylesheet";
          cssLink.type = "text/css";
          console.log(`applying CSS.`)
          document.head.appendChild(cssLink);
          document.body.classList.add(data.current_theme);
        }

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
