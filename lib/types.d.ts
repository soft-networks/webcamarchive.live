interface Video {
  id: string;
  imageSrc: string;
  videoSrc: string;
}
type VideoList = Video[];
type VideoData = {[key:string]: Video}

interface Message {
  username: string;
  text: string
}

