import type { Metadata } from "next";
import MessageBoardClient from "./MessageBoardClient";

export const metadata: Metadata = {
  title: "留言板",
};

export default function Page() {
  return <MessageBoardClient />;
}