import BodyFront from "../components/bodies/bodyFront";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Index = () => {
  return (
    <NextUIProvider>
      <div
        className={`${montserrat.className} container px-0 py-11 mx-auto flex justify-center`}
        style={
          {
            // marginTop: "150px",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
        <BodyFront />
      </div>
    </NextUIProvider>
  );
};

export default Index;
