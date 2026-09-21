import "./terminal/terminal.css";
import TerminalPage from "./terminal/page";
import { ThemeInit } from "./terminal/components/ThemeInit";

export default function Home() {
  return (
    <div className="tm-root">
      <ThemeInit />
      <TerminalPage />
    </div>
  );
}
