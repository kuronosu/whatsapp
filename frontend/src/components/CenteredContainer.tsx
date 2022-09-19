import tw from "tailwind-styled-components";

const CenteredContainer = tw.div<any>`
w-full h-full flex justify-center
items-center text-2xl text-white
  ${({ $primaryBg = true }: { $primaryBg: boolean }) =>
    $primaryBg ? "bg-zinc-900" : "bg-stone-900"}
`;

export default CenteredContainer;
