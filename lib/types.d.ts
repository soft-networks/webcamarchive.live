interface Video {
  id: string;
  imageSrc: string;
  videoSrc: string;
}
type VideoList = Video[];

interface Message {
  username: string;
  text: string
}