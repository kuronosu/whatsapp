import tw from "tailwind-styled-components";

export const FormContainer = tw.div<any>`
flex
w-full
h-full
justify-center
items-center
bg-green_lite
`;

export const FormCard = tw.div<any>`
p-7
flex
w-96
flex-col
shadow-2xl
rounded-xl
bg-zinc-900
`;

export const CenteredContainer = tw.div<any>`
w-full h-full flex justify-center
items-center text-2xl text-white
  ${({ $primaryBg = true }: { $primaryBg: boolean }) =>
    $primaryBg ? "bg-zinc-900" : "bg-stone-900"}
`;

export function MaterialInput({ label, type, name, ...props }: any) {
  return (
    <div className="py-2 relative border-b-2 focus-within:border-indigo-500">
      <input
        type={type}
        name={name}
        title={name}
        id={name}
        placeholder=" "
        autoComplete="off"
        className="block w-full appearance-none focus:outline-none bg-transparent text-white"
        {...props}
      />
      <label
        htmlFor={name}
        className={`absolute top-2 left-0 text-gray-500 duration-300 origin-0 cursor-text ${
          props.value && "text-2xl"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
