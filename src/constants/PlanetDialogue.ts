// Import global types
import type { PlanetDialogueType } from "../types/global";

// Importing Icons
import { RiRobot3Fill } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa";

const PlanetDialogue: PlanetDialogueType = {
  Earth: {
    introDialog: [
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Good morning, it seems you have awakened.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "The shuttle has successfully exited Earth's atmosphere.",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "*groan*",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Ah, how long was I out for?",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "It appears you passed out during our launch into space.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Shall I brief the mission to you again in case you have forgotten?",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Yeah sure go for it, a reminder wouldn't hurt.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Very well.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Mission briefing, June 20th, 2079. To travel to all eight planets in our solar system and collect vital research data.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Utilizing the new and improved shuttle for space travel, THE BEYOND.",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Alright, just going to all the planets and getting data, shouldn't be too bad.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Correct.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Allow me to guide you through the process of data collection.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "We first need to access our console to see what data we need to collect. Look around and click on the RIGHT SCREEN.",
      },
    ],
    outroDialog: [
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Alright, this shouldn't be too hard.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Yes. As you can see, gathering data is not a difficult task.",
      },
      {
        speaker: "COMPUTER",
        avatar: RiRobot3Fill,
        text: "Just make sure to follow the steps for data collection, and you will able to return home in no time.",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "You got it robot.",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Hey by the way, what should I call you?",
      },
      {
        speaker: "AllY",
        avatar: RiRobot3Fill,
        text: "You may call me ALLY, the name given to me by my manufacturers.",
      },
      {
        speaker: "YOU",
        avatar: FaUserAstronaut,
        text: "Alright ALLY, let's get this show on the road!",
      },
    ],
  },
  Mercury: {
    introDialog: [
      {
        speaker: "Ally",
        avatar: RiRobot3Fill,
        text: "We have arrived at Mercury.",
      },
      {
        speaker: "Ally",
        avatar: RiRobot3Fill,
        text: "Here we can try practicing what we learned for data collection.",
      },
    ],
    outroDialog: [],
  },
};

export { PlanetDialogue };
