export const scrollToElement = (ref: any) => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
