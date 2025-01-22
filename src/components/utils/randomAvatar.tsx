import { getAvatarUrl } from "@/helper/avatar";

interface RandomAvatarProps {
  seed: any;
  width: string;
  bg?: string;
}

const RandomAvatar = ({ seed, width, bg }: RandomAvatarProps) => {
  return (
    <img
      src={getAvatarUrl(seed, bg)}
      alt="avatar"
      width={width}
      className={`rounded-full ${bg}`}
    />
  );
};

export default RandomAvatar;
