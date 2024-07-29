import React, { useEffect, useState } from 'react';

type Question = {
    questionTxt: string;
}

type Answer = {
    id: number;
    questionId: number;
    userId: string;
    answerTxt: string;
    question: Question;
};

const ReportPage = () => {
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/answers')
            .then(response => response.json())
            .then(data => setAnswers(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Report</h1>
            {answers.map(answer => (
                <div key={answer.id}>
                    <p>{answer.question.questionTxt}</p>
                    <p>{answer.answerTxt}</p>
                </div>
            ))}
        </div>
    );
};

export default ReportPage;