// Import global types
import type { PlanetDialogueType } from "../types/global";

// Importing Icons
import { RiRobot3Fill } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa";

const PlanetDialogue: PlanetDialogueType = {
  earth: {
    introDialog: [
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Good morning, it seems you have awakened.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "The shuttle as successfully exited Earth's atmosphere.",
      },
      // {
      //   speaker: "YOU",
      //   avatar: FaUserAstronaut,
      //   text: "*groan*",
      // },
      // {
      //   speaker: "YOU",
      //   avatar: FaUserAstronaut,
      //   text: "Ah, how long was I out for?",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "It appears you passed out during our launch into space.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Shall I brief the mission to you again in case you have forgotten?",
      // },
      // {
      //   speaker: "YOU",
      //   avatar: FaUserAstronaut,
      //   text: "Yeah sure go for it, a reminder wouldn't hurt.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Very well.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Mission briefing, June 20th, 2079. To travel to all eight planets in our solar system and collect vital research data.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Utilizing the new and improved shuttle for space travel, THE BEYOND.",
      // },
      // {
      //   speaker: "YOU",
      //   avatar: FaUserAstronaut,
      //   text: "Alright, just going to all the planets and getting data, shouldn't be too bad.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Correct.",
      // },
      // {
      //   speaker: "COMPUTER",
      //   avatar: RiRobot3Fill,
      //   text: "Allow me to guide you through the process of data collection.",
      // },
    ],
  },
  mercury: {
    introDialog: [
      {
        speaker: "Ally",
        avatar: RiRobot3Fill,
        text: "Ah! I see that you have finally woken up.",
      },
      {
        speaker: "Ally",
        avatar: RiRobot3Fill,
        text: "We have approached the outer atmosphere of Earth.",
      },
    ],
  },
};

export { PlanetDialogue };
