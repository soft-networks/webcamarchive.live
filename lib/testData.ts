export function testVideoList() {

  let vidnames = [
    "Movie on 1-22-16 at 9.01 PM",
    "Movie on 1-22-17 at 11.39 AM",
    "Movie on 1-22-17 at 11.43 AM",
    "Movie on 1-23-17 at 3.06 PM",
    "Movie on 1-24-16 at 1.50 PM",
    "Movie on 1-24-16 at 9.29 PM",
    "Movie on 1-24-19 at 11.41 PM",
    "Movie on 1-25-17 at 12.54 PM",
    "Movie on 1-27-17 at 2.26 PM",
    "Movie on 1-27-17 at 5.45 PM",
    "Movie on 1-28-17 at 3.24 AM",
    "Movie on 1-28-17 at 7.30 PM",
    "Movie on 1-30-17 at 12.33 PM",
    "Movie on 2-11-17 at 7.54 PM",
    "Movie on 2-11-17 at 8.00 PM",
    "Movie on 2-11-17 at 8.43 PM",
    "Movie on 2-11-17 at 8.56 PM",
    "Movie on 2-11-17 at 9.02 PM",
    "Movie on 2-13-17 at 1.47 PM",
    "Movie on 2-16-21 at 3.21 PM",
    "Movie on 2-2-17 at 12.13 PM",
    "Movie on 2-3-17 at 12.32 PM",
    "Movie on 2-3-17 at 12.36 PM",
    "Movie on 2-8-17 at 3.32 PM",
    "Movie on 2-8-17 at 3.45 PM",
    "Movie on 2-9-19 at 2.46 PM",
  ];

  const root = "/assets/testvids/";

  let videos: VideoList = vidnames.map((v) => ( {
    id: v,
    imageSrc: `${root}${v}.png`,
    videoSrc: `${root}${v}.mp4`,
  }))

  return videos;
  
}