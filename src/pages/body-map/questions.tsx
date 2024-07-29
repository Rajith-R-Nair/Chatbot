import React from "react";
import Page from "../../components/bodyQuestions/page";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Questions = () => {
  return (
    <main
      className={`${montserrat.className} container px-0 py-11 mx-auto flex justify-center `}
    >
      <Page />
    </main>
  );
};

export default Questions;
