import tw from "tailwind-styled-components";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MenuItem = tw.a<any>`
  px-2
  py-1
  flex
  items-center
  rounded-lg
  text-gray-300
  hover:brightness-125
  hover:text-gray-50
`;

const IconButton = tw.button<any>`
  p-1
  m-2
  ml-0
  flex
  w-8
  h-8
  bg-dark
  bg-opacity-70
  rounded-full
  items-center
  justify-center
  duration-300
`;

const DropdownContainer = styled.div`
  position: absolute;
  transform: translateX(-45%);
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 8px;
  /* padding: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem; */
  padding: 0.25rem 0.75rem;
  overflow: hidden;
  transition: height 500ms ease;
  color: #fff;
`;

export function DropdownItem({ leftIcon, children, ...props }: any) {
  return (
    <MenuItem href="/#" {...props}>
      {leftIcon && <IconButton>{leftIcon}</IconButton>}
      {children}
    </MenuItem>
  );
}

export default function DropdownMenu() {
  const { logout } = useAuth();
  return (
    <DropdownContainer>
      {/* <DropdownItem>My Profile</DropdownItem> */}
      <DropdownItem>
        <Link to="friends"> Friends</Link>
      </DropdownItem>
      <Separator />
      <DropdownItem onClick={logout}>Logout</DropdownItem>
    </DropdownContainer>
  );
}

function Separator() {
  return <hr className="border-gray-600 m-0" />;
}
