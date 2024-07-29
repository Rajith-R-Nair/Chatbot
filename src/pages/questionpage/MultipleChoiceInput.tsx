import React, { useState } from 'react';

type MultipleChoiceInputProps = {
    choices: string[];
    onChange: (selectedChoices: string[]) => void;
};

const MultipleChoiceInput = ({ choices, onChange }: MultipleChoiceInputProps) => {
    const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

    const handleChoiceClick = (choice: string) => {
        let updatedChoices;
        if (selectedChoices.includes(choice)) {
            updatedChoices = selectedChoices.filter(selectedChoice => selectedChoice !== choice);
        } else {
            updatedChoices = [...selectedChoices, choice];
        }
        setSelectedChoices(updatedChoices);
        onChange(updatedChoices);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {choices.map((choice, index) => (
                <button
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: selectedChoices.includes(choice) ? 'blue' : 'white',
                        color: selectedChoices.includes(choice) ? 'white' : 'black',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {choice}
                </button>
            ))}
        </div>
    );
};

export default MultipleChoiceInput;
