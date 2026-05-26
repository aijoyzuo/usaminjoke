import type { Metadata } from "next";
import CreatorsClient from "./CreatorsClient";



export const metadata: Metadata = {
  title: "創作者",
};

export default function Page() {
  return <CreatorsClient />; 
}