import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
        <div className="text-3xl font-bold underline">Hello worldd</div>
        <Button>Click me</Button>
  </div>
  );
}
