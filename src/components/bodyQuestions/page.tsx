import React, { useEffect, useState } from "react";
import RadioButtonGroup from "@/pages/questionpage/radiobuttongroup";
import TextInput from "@/pages/questionpage/TextInput";
import ScaleInput from "@/pages/questionpage/ScaleInput";
import MultipleChoiceInput from "@/pages/questionpage/MultipleChoiceInput";
import { useRouter } from "next/router";
import "./styles.css";

type Question = {
  id: number;
  questionTxt: string;
  bodypartId: number | null;
  dataType: "radio" | "string" | "scale" | "multipleChoice";
  questionChoice: QuestionChoice[];
};

type QuestionChoice = {
  id: number;
  questionId: number;
  choiceTxt: string;
};

type Bodypart = {
  id: number;
  bodypartname: string;
};

const Page = () => {
  const [bodyparts, setBodyParts] = useState<Bodypart[]>([]);
  const [generalQuestions, setGeneralQuestions] = useState<Question[]>([]);
  const [specificQuestions, setSpecificQuestions] = useState<Question[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const userId = "a";

  const router = useRouter();
  const initialSelectedBodyparts = router.query.selectedBodyparts
    ? JSON.parse(router.query.selectedBodyparts as string)
    : [];
  const [selectedBodyparts, setSelectedBodyparts] = useState<string[]>(
    initialSelectedBodyparts
  );

  useEffect(() => {
    console.log("useEffect is running");
    fetch("http://localhost:3001/api/questions/generalquestions") // Updated endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("General Question data: " + data);
        data.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
        setGeneralQuestions(data);
        console.log(data);

        // Fetch specific questions for each selected body part
        const selectedBodyparts = router.query.selectedBodyparts
          ? JSON.parse(router.query.selectedBodyparts as string).map(Number)
          : [];
        console.log(selectedBodyparts);
        Promise.all(
          selectedBodyparts.map((bodypart: number) =>
            fetch(
              `http://localhost:3001/api/questions/bodyparts/${bodypart}`
            ).then((response) => response.json())
          )
        ).then((specificQuestionsArray) => {
          console.log(specificQuestionsArray);
          const combinedSpecificQuestions = [].concat(
            ...specificQuestionsArray
          );
          const combinedQuestions = [...data, ...combinedSpecificQuestions]; // Combine general and specific questions

          // Remove duplicate questions based on their id
          const uniqueQuestions = Array.from(
            new Set(combinedQuestions.map((q) => q.id))
          ).map((id) => combinedQuestions.find((q) => q.id === id));

          setAllQuestions(uniqueQuestions); // Update all questions with the unique questions
          console.log(uniqueQuestions);
          if (uniqueQuestions.length > 0) {
            setCurrentQuestion(uniqueQuestions[0]);
          }
        });
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleNextClick = () => {
    if (selectedAnswer && userId && currentQuestion) {
      let answers;
      if (currentQuestion.dataType.toLowerCase() === "multiplechoice") {
        answers = selectedAnswer.split(",").map((answer) => ({
          questionId: currentQuestion.id,
          userId: userId,
          answerTxt: answer.trim(),
          date: new Date().toISOString(),
        }));
      } else {
        answers = [
          {
            questionId: currentQuestion.id,
            userId: userId,
            answerTxt: selectedAnswer,
            date: new Date().toISOString(),
          },
        ];
      }

      answers.forEach((answer) => {
        fetch("http://localhost:3001/api/answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Successfully saved answer:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
    const currentIndex = allQuestions.findIndex(
      (question) => question === currentQuestion
    );
    const nextQuestion = allQuestions[currentIndex + 1];
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(null);
  };

  return (
    <section className="lg:w-2/1 md:w-1/2 question-card-box rounded-lg p-8 flex flex-col w-full">
      {currentQuestion && ( // Display only the current question
        <div key={currentQuestion.id}>
          <p className="font-color-green pb-2">{currentQuestion.questionTxt}</p>

          {currentQuestion.dataType.toLowerCase() === "radio" &&
            currentQuestion.questionChoice && (
              <RadioButtonGroup
                choices={currentQuestion.questionChoice.map(
                  (choice) => choice.choiceTxt
                )}
                onChoiceSelected={(selected) => setSelectedAnswer(selected)}
              />
            )}

          {currentQuestion.dataType.toLowerCase() === "string" && (
            <TextInput onChange={(value) => setSelectedAnswer(value)} />
          )}

          {currentQuestion.dataType.toLowerCase() === "scale" && (
            <ScaleInput
              choices={currentQuestion.questionChoice.map(
                (choice) => choice.choiceTxt
              )}
              onChange={(value) => setSelectedAnswer(value)}
            />
          )}

          {currentQuestion.dataType.toLowerCase() === "multiplechoice" && (
            <MultipleChoiceInput
              choices={currentQuestion.questionChoice.map(
                (choice) => choice.choiceTxt
              )}
              onChange={(selectedChoices) =>
                setSelectedAnswer(selectedChoices.join(","))
              }
            />
          )}
        </div>
      )}

      <button
        className="flex mx-auto mt-6 text-white button-next-question border-0 py-2 px-5 focus:outline-none button-next-question:hover rounded"
        onClick={handleNextClick}
        disabled={
          !currentQuestion ||
          allQuestions.indexOf(currentQuestion) === allQuestions.length - 1 ||
          !selectedAnswer
        }
      >
        Next
      </button>
    </section>
  );
};

export default Page;
