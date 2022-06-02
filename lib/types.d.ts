interface Video {
  id: string;
  pngSrc: string;
  webpSrc: string;
  videoSrc: string;
}
type VideoList = Video[];
type VideoData = {[key:string]: Video}

interface Message {
  username: string;
  text: string;
  timestamp: number;
}

declare module 'react-twitch-embed' {
  export class TwitchPlayer extends React.Component<any, any> {
    
  }
}

