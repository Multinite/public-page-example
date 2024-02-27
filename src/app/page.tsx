"use client";
import { useEffect } from "react";
//@ts-ignore
import type { PPC_messageType } from "./../../../../multinite-server/src/app/components/_mainNav/PPC";

export default function Home() {
  useEffect(() => {
    console.log("Hello world from another site!");

    window.postMessage(
      {
        type: "init",
      },
      "*"
    );

    window.addEventListener(
      "message",
      (event) => {
        if (
          !["https://multinite.com", "http://localhost:3000"].includes(
            event.origin
          )
        )
          return;

        const { type, success, error, data }: PPC_messageType = JSON.parse(
          event.data
        );

        if (type === "heartbeat") {
          console.log("heartbeat received");
          const data: PPC_messageType = {
            type: "heartbeat_response",
            data: null,
            error: null,
            success: true,
          };
          window.top?.postMessage(data);
        }

        if (type === "init") {
          if (success) {
            const cssLink = document.createElement("link");
            cssLink.href = data.css_path;
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
            console.log(`applying CSS.`);
            document.head.appendChild(cssLink);
            document.body.classList.add(data.current_theme);
            document.documentElement.style.setProperty("colorScheme", "dark");
          } else {
            throw new Error("Failed to initialize", {
              cause: error,
            });
          }
        }

      },
      false
    );
  }, []);

  return (
    <div className="p-3">
      <div className="bg-background text-content1-foreground flex flex-col gap-3">
        hello world! - testing alert
        <div className="w-20 h-20 bg-primary border-1 border-red-500">
          primary
        </div>
        <div className="w-20 h-20 bg-secondary border-1 border-red-500">
          secondary
        </div>
        <div className="w-20 h-20 bg-success border-1 border-red-500">
          success
        </div>
      </div>
    </div>
  );
}
