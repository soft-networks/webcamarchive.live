import { getAllVideoList } from "./vidData";


class VideoInfo {
  allVideos: VideoData 
  constructor(data: VideoList) {
    this.allVideos = {};
    data.forEach((v) => {
      this.allVideos[v.id] = v;
    });
  }
  getVideoById(id: string): Video {
    return this.allVideos[id];
  }
  videoExists(id: string): boolean {
    return this.allVideos[id] !== undefined;
  }
  getAllIDs(): string[] {
    return Object.keys(this.allVideos);
  }
  getNumVideos(): number {
    return this.getAllIDs().length;
  }
}


const videoInfo = new VideoInfo(getAllVideoList());

export default videoInfo;