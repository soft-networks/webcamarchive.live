export function testVideoList() {
  let vidnames = [
    "Movie on 1-22-16 at 9.01 PM",
    "Movie on 1-22-17 at 11.39 AM",
    "Movie on 1-24-16 at 1.50 PM",
    "Movie on 1-24-16 at 9.29 PM",
    "Movie on 1-27-17 at 2.26 PM",
    "Movie on 1-30-17 at 12.33 PM",
    "Movie on 2-3-17 at 12.32 PM",
    "Movie on 2-3-17 at 12.36 PM",
    "Movie on 2-8-17 at 3.32 PM",
    "Movie on 2-9-19 at 2.46 PM",
    "Movie on 3-20-18 at 6.02 PM",
    "Movie on 3-27-18 at 5.57 PM",
    "Movie on 3-28-17 at 2.52 PM",
    "Movie on 3-28-17 at 3.05 PM",
    "Movie on 3-28-17 at 3.44 PM",
    "Movie on 3-3-18 at 1.25 PM",
    "Movie on 3-8-19 at 10.56 PM",
    "Movie on 3-9-17 at 7.33 PM",
    "Movie on 3-9-18 at 3.41 PM",
    "Movie on 4-26-17 at 6.36 PM",
    "Movie on 4-26-17 at 6.51 PM",
    "Movie on 4-6-16 at 7.20 PM",
    "Movie on 4-6-16 at 8.35 PM",
    "Movie on 4-8-16 at 2.25 AM",
    "Movie on 5-26-18 at 2.31 PM",
    "Movie on 5-29-15 at 9.02 PM",
    "Movie on 7-7-15 at 11.04 PM",
    "Movie on 7-9-15 at 1.11 AM",
    "Movie on 9-3-15 at 8.40 PM",
  ];

  const root = "https://storage.googleapis.com/molly-archive/testvids/";

  let videos: VideoList = vidnames.map((v) => {
    const encoded = encodeURIComponent(v);
    return {
      id: v,
      imageSrc: `${root}${encoded}.png`,
      videoSrc: `${root}${encoded}.mp4`,
    };
  });

  return videos;
}

export const TEST_STATIC_URL = "https://storage.cloud.google.com/molly-archive/static-2.mp4";