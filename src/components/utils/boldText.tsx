const BoldText = ({ text, highlights }: any) => {
  const regex = new RegExp(`(${highlights.join("|")})`, "gi");
  const lines = text.split("\n");
  return (
    <p>
      {lines.map((line: any, index: number) => (
        <p key={index}>
          {line.split(regex).map((part: any, i: number) =>
            highlights.some(
              (word: string) => word.toLowerCase() === part.toLowerCase()
            ) ? (
              <span key={i} className="text-black font-bold">
                {part}
              </span>
            ) : (
              part
            )
          )}
          <br />
        </p>
      ))}
    </p>
  );
};

export default BoldText;
