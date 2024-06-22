import React from "react";
import Lottie from "react-lottie";
import animationSettings from "../../../img/SettingIcons.json";
import "./SettingsIcon.css";

const SettingIcon: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationSettings,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="settingsIcon"
      onClick={() => {
        console.log("Settings Icon Clicked");
      }}
      style={{
        borderRadius: "50%",
        backgroundColor: "#f9a407",
        transition: "transform 0.3s ease-in-out",
        width: "25px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
        padding: "0",
      }}
    >
      <Lottie
        options={defaultOptions}
        height={25}
        width={25}
        isClickToPauseDisabled={true}
      />
    </div>
  );
};

export default SettingIcon;
