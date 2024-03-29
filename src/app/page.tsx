"use client";
import { useTabManager } from "@/api/publicTabManager";
import { Button, Input } from "@nextui-org/react";
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
        <div className="w-20 h-20 bg-success border-1 border-red-500 ">
          success
        </div>
        <div className="max-w-[100px]">
          <Button
            color="primary"
            onPress={() =>
              tabManager.tabAlert({
                body: (
                  <>
                    <h1
                      className="text-primary text-2xl"
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      This is a test
                    </h1>
                    <h1 className="text-success">This is a test</h1>
                  </>
                ),
              })
            }
          >
            Test button that uses primary.
          </Button>
        </div>
        <div className="">
          <iframe
            width="560"
            height="315"
            src="http://localhost:3001"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
