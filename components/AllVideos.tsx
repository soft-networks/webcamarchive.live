import { useAllVideos } from "../providers/AllVideoProvider";
import Image from "next/image";
import classNames from "classnames";

const AllVideos: React.FunctionComponent = () => {
  const allVideos = useAllVideos();

  return (
    <div className="fullBleed">
      {allVideos.map((v) => (
        <VideoThumbnail key={v.id + "thumb"} video={v} initX={Math.random() * 90} initY={Math.random() * 90} />
      ))}
    </div>
  );
};

interface VideoThumbnailProps {
  video: Video;
  initX: number;
  initY: number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, initX, initY }) => {
  return (
    <div style={{ position: "absolute" ,top: initX + "%", left: initY + "%"}}>
      <div style={{  position: "relative" }} className={classNames({ noselect:true, noevents: true})}>
        <Image
          src={video.imageSrc}
          alt={`Thumbnail for ${video.id}`}
          key={`img-${video.id}`}
          className="thumbnailImage"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default AllVideos;
