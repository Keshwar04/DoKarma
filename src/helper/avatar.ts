export const getAvatarUrl = (username: string | null, bg = "ffdfbf") => {
  const seed = username || "do_karma";
  return `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&backgroundColor=${bg}`;
};
