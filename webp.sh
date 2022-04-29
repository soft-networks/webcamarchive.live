cd ../content;

for file in *.png; do
  cwebp -q 80 "${file}" -o "${file%.*}".webp;
done 

