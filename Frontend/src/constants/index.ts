import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];
export const marsWeatherDummyData = {
  sol_keys: ["675", "676", "677", "678", "679", "680", "681"],
  validityChecks: {
    sol_hours_required: 18,
    sols_checked: ["675", "676", "677", "678", "679", "680", "681"],
  },
  sols: {
    681: {
      sol: 681,
      season: "fall",
      northernSeason: "mid winter",
      southernSeason: "mid summer",
      firstUTC: "2020-10-25T22:29:51Z",
      lastUTC: "2020-10-26T23:09:26Z",
      temperature: {
        average: -62.434,
        min: -95.447,
        max: -4.444,
      },
      windSpeed: {
        average: 5.632,
        min: 0.228,
        max: 18.577,
      },
      pressure: {
        average: 743.55,
        min: 718.463,
        max: 760.2244,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    680: {
      sol: 680,
      season: "fall",
      northernSeason: "mid winter",
      southernSeason: "mid summer",
      firstUTC: "2020-10-24T21:50:16Z",
      lastUTC: "2020-10-25T22:29:51Z",
      temperature: {
        average: -61.789,
        min: -96.811,
        max: -15.298,
      },
      windSpeed: {
        average: 6.517,
        min: 0.275,
        max: 24.235,
      },
      pressure: {
        average: 743.99,
        min: 717.1398,
        max: 764.0093,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    679: {
      sol: 679,
      season: "fall",
      northernSeason: "mid winter",
      southernSeason: "mid summer",
      firstUTC: "2020-10-23T21:10:41Z",
      lastUTC: "2020-10-24T21:50:16Z",
      temperature: {
        average: -62.551,
        min: -96.644,
        max: -11.561,
      },
      windSpeed: {
        average: 5.565,
        min: 0.231,
        max: 19.409,
      },
      pressure: {
        average: 744.529,
        min: 719.4178,
        max: 763.2724,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    678: {
      sol: 678,
      season: "fall",
      northernSeason: "mid winter",
      southernSeason: "mid summer",
      firstUTC: "2020-10-22T20:31:06Z",
      lastUTC: "2020-10-23T21:10:41Z",
      temperature: {
        average: -62.562,
        min: -97.728,
        max: -9.055,
      },
      windSpeed: {
        average: 5.246,
        min: 0.244,
        max: 18.399,
      },
      pressure: {
        average: 743.741,
        min: 717.7254,
        max: 760.2834,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    677: {
      sol: 677,
      season: "fall",
      northernSeason: "mid winter",
      southernSeason: "mid summer",
      firstUTC: "2020-10-21T19:51:31Z",
      lastUTC: "2020-10-22T20:31:06Z",
      temperature: {
        average: -63.056,
        min: -97.249,
        max: -16.853,
      },
      windSpeed: {
        average: 7.887,
        min: 0.511,
        max: 23.197,
      },
      pressure: {
        average: 748.698,
        min: 720.5873,
        max: 767.4249,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    676: {
      sol: 676,
      season: "fall",
      northernSeason: "early winter",
      southernSeason: "early summer",
      firstUTC: "2020-10-20T19:11:55Z",
      lastUTC: "2020-10-21T19:51:31Z",
      temperature: {
        average: -62.812,
        min: -96.912,
        max: -16.499,
      },
      windSpeed: {
        average: 8.526,
        min: 1.11,
        max: 26.905,
      },
      pressure: {
        average: 749.09,
        min: 722.473,
        max: 767.1426,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
    675: {
      sol: 675,
      season: "fall",
      northernSeason: "early winter",
      southernSeason: "early summer",
      firstUTC: "2020-10-19T18:32:20Z",
      lastUTC: "2020-10-20T19:11:55Z",
      temperature: {
        average: -62.314,
        min: -96.872,
        max: -15.908,
      },
      windSpeed: {
        average: 7.233,
        min: 1.051,
        max: 22.455,
      },
      pressure: {
        average: 750.563,
        min: 722.0901,
        max: 768.791,
      },
      windDirectionDegrees: 292.5,
      windDirectionCompass: "WNW",
    },
  },
};

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Fast responding",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
