export type ImageViewModel = {
  base64String: string;
};
export const ImageComponent = ({ base64String }: ImageViewModel) => {
  const imageUrl = `data:image/png;base64,${base64String}`;

  return (
    <div>
      <img src={imageUrl} alt="Base64 Image" width={640} height={480} />
    </div>
  );
};

export default ImageComponent;
