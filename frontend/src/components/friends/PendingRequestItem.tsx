import tw from "tailwind-styled-components";

const Btn = tw.button<any>`
rounded-lg 
bg-lime-900
duration-300 
text-gray-300
hover:bg-lime-800
hover:text-white
h-8
mt-2
px-2
`;

function PendingRequestItem({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <li className="flex items-center list-none justify-between text-white mr-4">
      <span className="p-4">{name}</span>
      <Btn onClick={onClick}>Accept</Btn>
    </li>
  );
}

export default PendingRequestItem;
