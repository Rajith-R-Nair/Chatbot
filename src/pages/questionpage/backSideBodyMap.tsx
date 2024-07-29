import React, { useEffect, useState, useContext } from "react";
import ImageMapper from "react-img-mapper";
import { useRouter } from "next/router";

type backBodypart = {
  id: number;
  bodypartname: string;
};
type backArea = {
  shape: string;
  name: string;
  coords: number[];
  preFillColor: string;
  fillColor: string;
  strokeColor: string;
  alt: string;
  id: string;
};

const BackSideBodyMap = () => {
  const [BackAreas, setBackAreas] = useState<backArea[]>([]);
  const [selectedBackBodyparts, setSelectedBackBodyparts] = useState<
    backBodypart[]
  >([]);
  const [backBodyparts, setBackBodyparts] = useState<backBodypart[]>([]);
  const router = useRouter();

  const coordsMapBack: { [key: string]: number[] } = {
    ThoracicSpine: [151, 102, 8.4],
    LumbarSpineLowerBack: [150, 135, 8.4],
    SacroiliacJointSIJ: [153, 168, 8.4],
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/backBodyParts")
      .then((response) => response.json())
      .then((data: any) => {
        setBackBodyparts(data);
        console.log("back", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const newBackAreas = backBodyparts.map((backBodypart) => ({
      shape: "circle",
      name: backBodypart.bodypartname,
      coords: coordsMapBack[backBodypart.bodypartname],
      preFillColor: "rgba(5,171,194,0.1)",
      fillColor: "rgba(5,171,194,0.6)",
      strokeColor: "rgba(5,171,194,1)",
      alt: backBodypart.bodypartname,
      id: backBodypart.id.toString(),
    }));
    setBackAreas(newBackAreas);
  }, [backBodyparts]);

  useEffect(() => {
    console.log(selectedBackBodyparts);
  }, [selectedBackBodyparts]);

  const handleBackAreaClick = (area: any, index: number, event: any) => {
    const backAreaPart = BackAreas.find((a) => a.id === area.id);
    if (backAreaPart) {
      const backBodypart = backBodyparts.find(
        (part) => part.id.toString() === backAreaPart.id
      );
      if (backBodypart) {
        console.log(`You clicked on ${backBodypart.bodypartname}`);
        setSelectedBackBodyparts((prevBackBodyParts) => {
          if (prevBackBodyParts.some((part) => part.id === backBodypart.id)) {
            return prevBackBodyParts.filter(
              (part) => part.id !== backBodypart.id
            );
          } else {
            return [...prevBackBodyParts, backBodypart];
          }
        });
      }
    }
  };

  const startChatbot = () => {
    router.push({
      pathname: "./page",
      query: {
        selectedBodyparts: JSON.stringify(
          selectedBackBodyparts.map((part) => part.id)
        ),
      },
    });
  };

  return (
    <div style={{ fontSize: "30px", textAlign: "center" }}>
      <p>Back</p>
      <ImageMapper
        src={`${process.env.PUBLIC_URL}/bodymapBack.png`}
        map={{
          name: "bodymapBack",
          areas: BackAreas,
        }}
        onClick={handleBackAreaClick}
        width={300}
      />
    </div>
  );
};

export default BackSideBodyMap;
