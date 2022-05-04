import { useEffect, useRef, useState } from "react";
import { getBackgroundList, getNumBackgrounds } from "../../lib/backgroundData";



const BackgroundButton: React.FC = () => {

  const backgrounds = useRef<{file: string, colors: string[], dark?: boolean}[]>(getBackgroundList());
  const [bg, setBg] = useState<number>();
  
  useEffect(() => {
    randomBG();
  }, []);
  const randomBG = () => {
    const bg = Math.floor(Math.random() * getNumBackgrounds());
    setBg(bg);
  }
  useEffect(() => {
    if (!bg) 
      return;

    let background = backgrounds.current[bg];
    document.documentElement.style.setProperty('--bgURL', `url(${background.file})`);
    document.documentElement.style.setProperty('--color1', background.colors[0]);
    document.documentElement.style.setProperty('--color2', background.colors[1]);
    document.documentElement.style.setProperty('--color3', background.colors[2]);

    if (background.dark) {
      console.log("DARK MODE");
      document.documentElement.style.setProperty('--textColor', "white");
      document.documentElement.style.setProperty('--gray', "#eee");
      document.documentElement.style.setProperty('--darkGray', "#eee");
      document.documentElement.style.setProperty('--lightGray', "#333");
    } else {
      document.documentElement.style.setProperty('--textColor', "black");
      document.documentElement.style.setProperty('--gray', "gray");
      document.documentElement.style.setProperty('--darkGray', "#333");
      document.documentElement.style.setProperty('--lightGray', "#eee");
    }

  }, [bg]);
  return (
    <div className="button" onClick={randomBG}>
      Change background
    </div>
  )
}

export default BackgroundButton;