"use client"
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("Hello world from another site!");
    console.log(document.cookie);
  }, []);

  return <div className="text-primary bg-background">hello world!</div>;
}
