const FloatingMenu = ({
  backToMenu,
  startNewGame,
}: {
  backToMenu: () => void;
  startNewGame: () => void;
}) => {
  useKeyboardShortcut(["Meta", "r"], startNewGame, { overrideSystem: true });
  useKeyboardShortcut(["Control", "r"], startNewGame, { overrideSystem: true });

  useKeyboardShortcut(["Meta", "m"], backToMenu, { overrideSystem: true });
  useKeyboardShortcut(["Control", "m"], backToMenu, { overrideSystem: true });

  return (
    <DropdownMenu.Root>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className={darkTheme} side="right" sideOffset={8}>
        <DropdownMenuItem onSelect={backToMenu}>
          Back to menu <RightSlot>⌘+M</RightSlot>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={startNewGame}>
          Restart game <RightSlot>⌘+R</RightSlot>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu.Root>
  );
};

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
});

const DropdownMenuTrigger = styled(DropdownMenu.Trigger, {
  position: "absolute",
  zIndex: "10",
  top: "1rem",
  left: "1rem",

  outline: "none",
  cursor: "pointer",

  color: "$mauve11",

  backgroundColor: "$mauve3",

  $$borderColor: "$colors$mauve7",
  $$borderWidth: "1px",
  boxShadow: `0 0 0 $$borderWidth $$borderColor`,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "2px",
  height: "3rem",
  width: "3rem",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  "&:hover": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$mauve4",
  },
  "&:focus": {
    $$borderColor: "$colors$crimson8",
    backgroundColor: "$mauve5",
    outline: "none",
  },

  variants: {
    selected: {
      true: {
        color: "$crimson12",

        $$borderColor: "$colors$crimson7",
        $$borderWidth: "2px",
        backgroundColor: "$mauve5",

        "&:hover": { $$borderColor: "$colors$crimson8" },
      },
    },
  },
});

const DropdownMenuContent = styled(DropdownMenu.DropdownMenuContent, {
  outline: "none",
  minWidth: "220px",

  color: "$mauve11",

  backgroundColor: "$mauve3",

  $$borderColor: "$colors$mauve7",
  $$borderWidth: "1px",
  boxShadow: `0 0 0 $$borderWidth $$borderColor`,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
  justifyContent: "center",
  borderRadius: "2px",
  padding: "0.25rem 0.5rem",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },
});

const DropdownMenuItem = styled(DropdownMenu.DropdownMenuItem, {
  cursor: "pointer",
  width: "100%",

  color: "$mauve11",

  backgroundColor: "$mauve3",

  $$borderColor: "transparent",
  $$borderWidth: "1px",
  boxShadow: `0 0 0 $$borderWidth $$borderColor`,

  display: "flex",
  justifyContent: "space-between",
  borderRadius: "2px",
  padding: "0.5rem",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  "&:hover": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$mauve4",
  },
  "&:focus": {
    color: "$mauve12",
    $$borderColor: "$colors$crimson8",
    backgroundColor: "$mauve5",
    outline: "none",
  },
});

export default FloatingMenu;

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { darkTheme, styled } from "stitches.config";
import { HamburgerMenuIcon } from "@modulz/radix-icons";
import { useEffect } from "react";
import useKeyboardShortcut from "lib/hooks/useKeyboardShortcut";
