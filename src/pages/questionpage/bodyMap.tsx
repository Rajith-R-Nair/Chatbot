import React, { useEffect, useState, useContext } from "react";
import ImageMapper from "react-img-mapper";
import { useRouter } from "next/router";
import BackSideBodyMap from "./backSideBodyMap";

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

const Page = () => {
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
      pathname: "./page",
      query: {
        selectedBodyparts: JSON.stringify(
          selectedBodyparts.map((part) => part.id)
          // || selectedBackBodyparts.map((part) => part.id)
        ),
      },
    });
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "30px", textAlign: "center" }}>
          <p>Front</p>
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
        <div style={{ fontSize: "30px", textAlign: "center" }}>
          <BackSideBodyMap />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
        >
          Selected areas:{" "}
          {selectedBodyparts.map((part) => part.bodypartname).join(", ")}
        </p>
        <button
          onClick={startChatbot}
          //disabled={}
          style={{
            padding: "10px 50px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Page;
