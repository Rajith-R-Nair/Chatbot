import React, { useState } from 'react';

type ScaleInputProps = {
    choices: string[];
    onChange: (value: string) => void;
};

const ScaleInput = ({ choices, onChange }: ScaleInputProps) => {
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

    const handleClick = (choice: string) => {
        setSelectedChoice(choice);
        onChange(choice);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {choices.map((choice, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(choice)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: selectedChoice === choice ? 'blue' : 'white',
                        color: selectedChoice === choice ? 'white' : 'black',
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

export default ScaleInput;
