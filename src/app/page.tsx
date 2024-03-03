"use client";
import { useTabManager } from "@/api/publicTabManager";
import { useEffect } from "react";

export default function Home() {
  const tabManager = useTabManager();
  useEffect(() => {
    tabManager.on("start", () => {
      tabManager.log({
        content: ["[MyPage] My Public page just started!", tabManager.tab],
        logStyle: "test",
      });
      tabManager.performance.loadFinished();
    });
  }, [tabManager]);

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
        <div className="w-20 h-20 border-1 border-red-500">
          success
        </div>
      </div>
    </div>
  );
}
