let bgFiles = [
  {
    file: "BG1.gif",
    colors: ["#66ff2e", "#008cf", "#4a3b5cf"],
  },

  {
    file: "BG2.gif",

    colors: ["#ff9ed0", "#9f9cff", "#9d00ff"],
  },

  {
    file: "BG3.gif",

    colors: ["#ffff00", "#ff9cb1", "#ffaf75"],
  },

  {
    file: "BG4.gif",

    colors: ["#296dff", "#0022ff", "#4f3d6b"],
  },

  {
    file: "BG5.jpg",

    colors: ["#f947ff", "#8a24ff", "#00d6cb"],
  },

  {
    file: "BG6.jpg",

    colors: ["#00d3d6", "#ff794d", "#6aa893"],
  },

  {
    file: "BG8.png",

    colors: ["#b3cf2b", "#ff38d7", "#cc99ff"],
  },

  {
    file: "BG9.gif",

    colors: ["#d4500f", "#2e8cff", "#ffa6f8"],
  },

  {
    file: "BG10.gif",

    colors: ["#3be2ff", "#ffe345", "#ff000d"],
  },

  {
    file: "BG11.gif",

    colors: ["#fff06b", "#9de88e", "#ed7f5a"],
  },

  {
    file: "BG12.gif",
    dark: true,
    colors: ["#ffbf52", "#febfff", "#e4c9ff"],
  },

  {
    file: "BG13.gif",

    colors: ["#dbff6e", "#ff9b05", "#ff38d7"],
  },

  {
    file: "BG14.gif",

    colors: ["#c4025d", "#cc99ff", "#2e8cff"],
  },

  {
    file: "BG15.gif",

    colors: ["#ffa6f8", "#858585", "#ffe345"],
  },

  {
    file: "BG17.gif",
    colors: ["#3300ff", "#fa93ce", "#6817ff"],
    dark: true,
  },

  {
    file: "BG18.gif",

    colors: ["#c71fff", "#c9eaff", "#ff00b3"],
  },

  {
    file: "BG19.png",
    dark: true,
    colors: ["#2ade4e", "#ff429a", "#9c5000"],
  },

  {
    file: "BG20.gif",
    dark: true,
    colors: ["#ff2d4a", "#22ff00", "#6b75ff"],
  },
  {
    file: "BG21.gif",
    dark: true,
    colors: ["#ff00a6", "#009e7e", "#ffb8e4"],
  },

  {
    file: "BG22.gif",

    colors: ["#99ffc3", "#2014ff", "#82e2ff"],
  },

  {
    file: "BG23.gif",

    colors: ["#ff0073", "#4c00ff", "#e9ffc7"],
  },

  {
    file: "BG24.gif",
    dark: true,
    colors: ["#aa00ff", "#8ad0ff", "#ff8640"],
  },

  {
    file: "BG25.gif",

    colors: ["#3344ff", "#d7ffcf", "#8175ff"],
  },

  {
    file: "BG26.gif",

    colors: ["#b3f9ff", "#ca7aff", "#ff87e1"],
  },

  {
    file: "BG27.gif",
    dark: true,
    colors: ["#9000ff", "#ffe680", "#ff531f"],
  },

  {
    file: "BG28.gif",
    dark: true,
    colors: ["#ff99b8", "#40ffd6", "#6461ff"],
  },

  {
    file: "BG29.gif",
    dark: true,
    colors: ["#9d94ff", "#00ffae", "#f5a6d0"],
  },

  {
    file: "BG30.gif",

    colors: ["#1ca0ff", "#ffd5a8", "#006aff"],
  },

  {
    file: "BG31.gif",
    dark: true,
    colors: ["#ff9524", "#00ff66", "#ff5e36"],
  },

  {
    file: "BG32.gif",
    dark: true,
    colors: ["#0008ff", "#e84fc2", "#6b3938"],
  },

  {
    file: "BG33.gif",

    colors: ["#e1ccff", "#c494ff", "#ff73dc"],
  },

  {
    file: "BG34.gif",

    colors: ["#ff0004", "#00f2ff", "#d87dff"],
  },

  {
    file: "BG35.gif",

    colors: ["#b3ac2b", "#0f6fff", "#ff5c6f"],
  },

  {
    file: "BG36.gif",

    colors: ["#ff5c7c", "#83a33e", "#ffe9cc"],
  },

  {
    file: "BG37.gif",

    colors: ["#c3a7cf", "#ff70a9", "#e3bcc5"],
  },

  {
    file: "BG38.gif",

    colors: ["#e8e8e8", "#c6c2ff", "#ff38cd"],
  },

  {
    file: "BG39.gif",

    colors: ["#0000ff", "#abffea", "#edd442"],
  },

  {
    file: "BG40.gif",

    colors: ["#adffe8", "#3049ff", "#5789ff"],
  },

  {
    file: "BG41.gif",

    colors: ["#5100ff", "#ff8faf", "#74dbda"],
  },

  {
    file: "BG42.gif",
    dark: true,
    colors: ["#b0adff", "#0004ff", "#73018c"],
  },

  {
    file: "BG43.gif",

    colors: ["#960062", "#b8f0ff", "#f89dfc"],
  },

  {
    file: "BG44.png",
    dark: true,
    colors: ["#008a5a", "#bdf5ff", "#ffa3dd"],
  },

  {
    file: "BG45.gif",

    colors: ["#1e9620", "#9c00fc", "#00ff66"],
  },
];

const root = "https://storage.googleapis.com/molly-archive/backgrounds/";

export const getBackgroundList = () => {
  return bgFiles.map(({file, colors, dark}) => ({file: `${root}${file}`, colors, dark}));
};

export const getNumBackgrounds = () => {
  return bgFiles.length;
};
