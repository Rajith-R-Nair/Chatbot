import React from "react";

export type RadioButtonProps = {
  label: string;
  isSelected: boolean;
  onChange: () => void;
};

const RadioButton = ({ label, isSelected, onChange }: RadioButtonProps) => {
  console.log("Rendering radio button for: ", label);
  return (
    <div className="flex items-center">
      <input type="radio" checked={isSelected} onChange={onChange} />
      <span className="mr-2.5 text-sm">{label}</span>
      <div
        style={{ width: "0.8em", height: "0.8em" }}
        className="ring ring-indigo-700 rounded-full relative"
      >
        {isSelected && (
          <div
            style={{ width: "70%", height: "70%", top: "15%", left: "15%" }}
            className="bg-indigo-700 rounded-full absolute"
          ></div>
        )}
      </div>
    </div>
  );
};

export type RadioButtonGroupProps = {
  choices: string[];
  onChoiceSelected: (selected: string) => void;
};

const RadioButtonGroup = ({
  choices,
  onChoiceSelected,
}: RadioButtonGroupProps) => {
  console.log("Choices: " + choices);
  const [selectedChoice, setSelectedChoice] = React.useState<string | null>(
    null
  );

  const handleChoiceSelected = (choice: string) => {
    setSelectedChoice(choice);
    onChoiceSelected(choice); // Call the callback with the selected choice
  };

  return (
    <div className={"flex flex-wrap"}>
      {choices.map((choice) => (
        <RadioButton
          key={choice}
          isSelected={selectedChoice !== null && choice === selectedChoice}
          label={choice}
          onChange={() => handleChoiceSelected(choice)}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
