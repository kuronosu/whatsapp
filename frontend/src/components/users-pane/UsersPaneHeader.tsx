import tw from "tailwind-styled-components";
import React, { useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import DropdownMenu from "./Dropdown";
import useAuth from "../../hooks/useAuth";

const HeaderContainer = tw.div<any>`
  h-14
  flex
  px-2
  w-full
  flex-row
  items-center
  bg-zinc-900
  min-h-[3.5rem]
  justify-between
`;

const UserAvatar = tw.button<any>`
  w-10
  h-10
  text-center
  rounded-full
  font-semibold
  bg-green_lite
`;

const NavItemAnchor = tw.a<any>`
  p-1
  flex
  bg-opacity-50
  bg-zinc-900
  rounded-full
  duration-300
  hover:brightness-200
  ${({ $open }: { $open: boolean }) => {
    return $open && `brightness-200`;
  }}
`;

function NavItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <NavItemAnchor
        $open={open}
        href="/#"
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {icon}
      </NavItemAnchor>

      {open && children}
    </div>
  );
}

export default function UsersPaneHeader() {
  const { decodedToken } = useAuth();
  return (
    <HeaderContainer>
      <UserAvatar>{decodedToken?.username[0].toUpperCase()}</UserAvatar>
      <NavItem icon={<MdOutlineMoreHoriz color="white" size={25} />}>
        <DropdownMenu />
      </NavItem>
    </HeaderContainer>
  );
}
