import type { DialogueEntry } from "../types/global";

import { RiRobot3Fill } from "react-icons/ri";

export const PlanetTutorialList: Record<number, string> = {
  0: "Click the arrow on the bottom right to continue.",
  13: "Click and drag with your mouse to look around.",
};

export const TutorialManager: Record<number, string> = {
  0: "Console",
  1: "Explain Orbit Controls",
  2: "Orbit Controls",
  3: "Ship Thrusters",
  4: "Shields Console",
  5: "Shields Complete",
  6: "Map",
};

export const TutorialDialogue: Record<string, DialogueEntry[]> = {
  Console: [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "This is the main console. Here is where we can check the progress of our data collection.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "We can also read up on the data we have already collected.",
    },
  ],
  "Explain Orbit Controls": [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "To collect our first set of data we need to enable our ORBIT CONTROLS.",
    },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "When THE BEYOND is set into orbit mode it will survey the outside of the planet.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "We will be able to find out the COLOR, MOONS, SIZE, and if the planet has a RING.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "You can enable the ORBIT CONTROLS by clicking the switch right under the central lever.",
    // },
  ],
  "Orbit Controls": [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "Once we have surveyed the planet, we can then enter the atmosphere.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "Once you are ready, pull on the SHIP THRUSTERS lever right in the middle of the ship.",
    },
  ],
  "Ship Thrusters": [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "As we enter the planets atmosphere, we need to adjust the craft's shield so that it can withstand the change in temperature.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "This will allow us to gather the TEMPERATURE of the planet.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "To adjust the shield, click on the SHIELDS CONSOLE, which is the screen to the very left.",
    },
  ],
  "Shields Console": [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "Adjust the dial so that the shields are regulated.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "You can do so by dragging the dial until the temperature light becomes green.",
    },
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "Once complete, the BEYOND will be close enough to the surface to collect data.",
    },
  ],
  "Shields Complete": [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "Once the shields are complete, as we approach the planet's surface we are able to gather data about its SURFACE TYPE.",
    },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "Since this is the final data point, we will now be able to select the next destination.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "We can access our next destination by using the MAP.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "To open the MAP, click on the LEFT SCREEN.",
    // },
  ],
  Map: [
    {
      speaker: "COMPUTER",
      avatar: RiRobot3Fill,
      text: "On the map you can see what destinations we are able to go to.",
    },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "Planets that have a CHECKMARK mean that we have already explored it.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "Planets that have a LOCK mean that it is inaccessible.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "Planets that we are able to select means that it would be the next destination.",
    // },
    // {
    //   speaker: "COMPUTER",
    //   avatar: RiRobot3Fill,
    //   text: "Click on the MAP, which is the screen to the left of the CONSOLE.",
    // },
  ],
};
