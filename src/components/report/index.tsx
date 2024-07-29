"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type Question = {
  questionTxt: string;
};

type Answer = {
  id: number;
  questionId: number;
  userId: string;
  answerTxt: string;
  question: Question;
};

const ReportPage = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  useEffect(() => {
    fetch("http://localhost:3001/api/answers")
      .then((response) => response.json())
      .then((data) => setAnswers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <section>
      <h1>Report</h1>
      {answers.map((answer) => (
        <div key={answer.id}>
          <p>{answer.question.questionTxt}</p>
          <p>{answer.answerTxt}</p>
        </div>
      ))}
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          subtitle="Press to expand"
          title="Accordion 1"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          subtitle={
            <span>
              Press to expand <strong>key 2</strong>
            </span>
          }
          title="Accordion 2"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          subtitle="Press to expand"
          title="Accordion 3"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ReportPage;
