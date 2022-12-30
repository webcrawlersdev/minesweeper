import { Command } from "cmdk";
import useKeyboardShortcut from "lib/hooks/useKeyboardShortcut";
import {
  useCmdkStore,
  useTimerVisibilityStore,
  useToolbarVisibilityStore,
} from "lib/store";
import { styled, darkTheme } from "stitches.config";

export const CommandMenu = ({
  backToMenu,
  startNewGame,
}: {
  backToMenu: () => void;
  startNewGame: () => void;
}) => {
  const { isOpen, open, close, setIsOpen } = useCmdkStore();
  const {
    toggleVisibility: toggleTimer,
    hide: hideTimer,
    show: showTimer,
  } = useTimerVisibilityStore();
  const {
    show: showToolbar,
    hide: hideToolbar,
    toggleVisibility: toggleToolbarVisibility,
    enterAutoMode: enterToolbarAutoMode,
    exitAutoMode: exitToolbarAutoMode,
  } = useToolbarVisibilityStore();

  // shortcuts
  // ✓ open command menu = cmd+k
  // ✓ back to menu = cmd+m
  // ✓ restart game = cmd+r
  // ✓ togle timer(clock) visibility: = cmd+shift+c (the browser cmd+t can't be prevented reliably and I don't want to override cmd+c)
  // - ✓ show (menu option)
  // - ✓ hide (menu option)
  // - toggle sounds
  // ✓ toggle toolbar mode:
  // - ✓ always show
  // - ✓ show on switch
  // - ✓ hide
  // - show tutorial

  const keyOptions = {
    overrideSystem: true,
    repeatOnHold: false,
  };

  useKeyboardShortcut(["Meta", "k"], open, keyOptions);
  useKeyboardShortcut(["Control", "k"], open, keyOptions);

  useKeyboardShortcut(["Meta", "r"], startNewGame, keyOptions);
  useKeyboardShortcut(["Control", "r"], startNewGame, keyOptions);

  useKeyboardShortcut(["Meta", "m"], backToMenu, keyOptions);
  useKeyboardShortcut(["Control", "m"], backToMenu, keyOptions);

  useKeyboardShortcut(["Meta", "Shift", "c"], toggleTimer, keyOptions);
  useKeyboardShortcut(["Control", "Shift", "c"], toggleTimer, keyOptions);

  return (
    <Dialog
      className={darkTheme}
      open={isOpen}
      onOpenChange={setIsOpen}
      label="Global Command Menu"
    >
      <Input />
      <List>
        <Command.Empty>No results found.</Command.Empty>
        <Group heading="Game">
          <Item
            onSelect={() => {
              backToMenu();
              close();
            }}
          >
            <Label>
              Back to menu
              <div>
                <Kbd>⌘</Kbd>
                <Kbd>M</Kbd>
              </div>
            </Label>
          </Item>

          <Item
            onSelect={() => {
              startNewGame();
              close();
            }}
          >
            <Label>
              Start new game
              <div>
                <Kbd>⌘</Kbd>
                <Kbd>R</Kbd>
              </div>
            </Label>
          </Item>
        </Group>
        <Group heading="Clock">
          <Item
            onSelect={() => {
              toggleTimer();
              close();
            }}
          >
            <Label>
              Toggle clock visibility
              <div>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>C</Kbd>
              </div>
            </Label>
          </Item>
          <Item
            onSelect={() => {
              hideTimer();
              close();
            }}
          >
            <Label>Hide clock</Label>
          </Item>
          <Item
            onSelect={() => {
              showTimer();
              close();
            }}
          >
            <Label>Show clock</Label>
          </Item>
        </Group>
        <Group heading="Toolbar">
          <Item
            onSelect={() => {
              toggleToolbarVisibility();
              close();
            }}
          >
            <Label>Toggle Toolbar visibility</Label>
          </Item>
          <Item
            onSelect={() => {
              showToolbar();
              exitToolbarAutoMode();
              close();
            }}
          >
            <Label>Show Toolbar</Label>
          </Item>
          <Item
            onSelect={() => {
              hideToolbar();
              exitToolbarAutoMode();
              close();
            }}
          >
            <Label>Hide Toolbar</Label>
          </Item>
          <Item
            onSelect={() => {
              enterToolbarAutoMode();
              close();
            }}
          >
            <Label>Enable auto show/hide Toolbar</Label>
          </Item>
          <Item
            onSelect={() => {
              exitToolbarAutoMode();
              close();
            }}
          >
            <Label>Disable auto show/hide Toolbar</Label>
          </Item>
        </Group>
      </List>
    </Dialog>
  );
};

export const CommandMenuButton = () => {
  const { open } = useCmdkStore();

  return <Button onClick={open}>⌘</Button>;
};

const Button = styled("button", {
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
  borderRadius: "5px",
  height: "3rem",
  width: "3rem",
  fontSize: "1.5rem",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  "&:hover": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$mauve4",
  },
  "&:focus": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$mauve5",
    outline: "none",
  },
});

const Dialog = styled(Command.Dialog, {
  position: "absolute",
  zIndex: "10",
  top: "20%",
  left: "50%",
  transform: "translate(-50%)",
  backgroundColor: "$mauve3",
  color: "$mauve11",
  padding: "0 0.5rem",
  borderRadius: "8px",
  boxShadow:
    "0 0 0 1px $mauve5, 0 4px 6px -1px $mauve6, 0 2px 4px -1px $mauve7",
  border: "1px solid $mauve7",

  "@media (max-width: 600px)": {
    top: "calc(1rem - 1px)",
  },
});

const Input = styled(Command.Input, {
  width: "600px",
  maxWidth: "90vw",
  padding: "1rem 0.25rem",
  backgroundColor: "$mauve3",
  color: "$mauve11",
  border: "none",
  fontSize: "1.5rem",

  "&:focus": {
    outline: "none",
  },
});

const List = styled(Command.List, {
  maxHeight: "60vh",
  overflowY: "auto",
  borderTop: "$border solid 1px",
  padding: "0.5rem 0.25rem",

  "@media (max-width: 600px)": {
    maxHeight: "40vh",
  },
});

const Group = styled(Command.Group, {
  padding: "0.5rem 0.25rem",

  [`& ${Input}`]: {
    marginLeft: "5px",
  },
});

const Item = styled(Command.Item, {
  marginTop: "0.25rem",
  padding: "0.5rem 0.5rem",
  borderRadius: "5px",

  "&[aria-selected='true']": {
    backgroundColor: "$mauve5",
    color: "$mauve12",
  },
});

const Label = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.25rem 0.5rem",
});

const Kbd = styled("kbd", {
  display: "inline-block",
  padding: "0.25rem 0.5rem",
  marginRight: "0.25rem",
  backgroundColor: "$mauve5",
  borderRadius: "3px",
  border: "1px solid $mauve6",
  color: "$mauve11",
  fontSize: "0.875rem",
  lineHeight: "1",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
});
