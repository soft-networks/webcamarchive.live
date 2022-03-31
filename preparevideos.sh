cd ../content;

rm *.png;
rm video-list.txt;

for file in *.mp4; do
  echo "${file%.*}";
  ffmpeg -i "${file}" -vframes 1 -an -s 540x360 -ss 0 "${file%.*}".png;
  # ffmpeg -i "$fullfile" -vf scale=640:480 -c:v libx264 -preset veryfast -crf 18 -c:a copy "${f%.*}-640x480.mp4"
done

ls -1a *.mp4 > ../content/video-list.txt;