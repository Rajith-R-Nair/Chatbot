"use client";
import React, { useEffect, useState, useContext } from "react";
import ImageMapper from "react-img-mapper";
import { useRouter } from "next/router";
import BackSideBodyMap from "./bodyBack";
import "./styles.css";

type Bodypart = {
  id: number;
  bodypartname: string;
};
type Area = {
  shape: string;
  name: string;
  coords: number[];
  preFillColor: string;
  fillColor: string;
  strokeColor: string;
  alt: string;
  id: string;
};

const BodyFront = () => {
  const [bodyparts, setBodyParts] = useState<Bodypart[]>([]);
  //const [selectedBodypartId, setSelectedBodypartId] = useState<number | null>(null);
  const [selectedBodyparts, setSelectedBodyparts] = useState<Bodypart[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const router = useRouter();
  const userId = "a";
  // Use this in future once users are implemented:
  //const [userId, setUserId] = useState<number | null>(null);

  const coordsMap: { [key: string]: number[] } = {
    Head: [168, 33, 8.4],
    Neck: [165, 72, 8.4],
    Jaw: [141, 57, 8.4],
    Chest: [150, 102, 8.4],
    Back: [174, 141, 8.4],
    Shoulder: [111, 90, 8.4],
    Elbow: [213, 135, 8.4],
    Knee: [132, 252, 8.4],
    Hand: [99, 186, 8.4],
    Hip: [180, 180, 8.4],
    Ankle: [180, 318, 8.4],
    HandR: [223, 188, 8.4],
    FootR: [186, 337, 8.4],
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/bodyparts")
      .then((response) => response.json())
      .then((data: any) => {
        setBodyParts(data);
        console.log("front", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const newAreas = bodyparts.map((bodyPart) => ({
      shape: "circle",
      name: bodyPart.bodypartname,
      coords: coordsMap[bodyPart.bodypartname],
      preFillColor: "rgba(5,171,194,0.1)",
      fillColor: "rgba(5,171,194,0.6)",
      strokeColor: "rgba(5,171,194,1)",
      alt: bodyPart.bodypartname,
      id: bodyPart.id.toString(),
    }));
    setAreas(newAreas);
  }, [bodyparts]);

  useEffect(() => {
    console.log(selectedBodyparts);
  }, [selectedBodyparts]);

  const handleAreaClick = (area: any, index: number, event: any) => {
    const areaPart = areas.find((a) => a.id === area.id);
    if (areaPart) {
      const bodyPart = bodyparts.find(
        (part) => part.id.toString() === areaPart.id
      );
      if (bodyPart) {
        console.log(`You clicked on ${bodyPart.bodypartname}`);
        setSelectedBodyparts((prevBodyParts) => {
          if (prevBodyParts.some((part) => part.id === bodyPart.id)) {
            return prevBodyParts.filter((part) => part.id !== bodyPart.id);
          } else {
            return [...prevBodyParts, bodyPart];
          }
        });
      }
    }
  };

  const startChatbot = () => {
    router.push({
      pathname: "/body-map/questions",
      query: {
        selectedBodyparts: JSON.stringify(
          selectedBodyparts.map((part) => part.id)
          // || selectedBackBodyparts.map((part) => part.id)
        ),
      },
    });
  };
  console.log("query", selectedBodyparts);

  return (
    <section className="constentBase">
      <div
        className="grid grid-cols-2 gap-2 place-content-center "
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        // }}
      >
        <div className="text-center">
          <p className="font-size-30 font-color-green">Front</p>
          <ImageMapper
            src={`${process.env.PUBLIC_URL}/bodymap.png`}
            map={{
              name: "bodymap",
              areas: areas,
            }}
            onClick={handleAreaClick}
            width={300}
          />
        </div>
        <div className="text-center">
          <BackSideBodyMap />
        </div>
      </div>
      <div className="text-center">
        <p className="font-size-18 font-color-green">
          Selected areas:{" "}
          {selectedBodyparts.map((part) => part.bodypartname).join(", ")}
        </p>
        <button
          onClick={startChatbot}
          //disabled={}
          className="button-select"
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default BodyFront;
