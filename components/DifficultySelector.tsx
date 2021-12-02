const DifficultySelector = () => {
  const { difficulty, setToDifficulty } = useDifficultyStore();

  return (
    <Box css={{ marginBottom: "2rem" }}>
      <Box css={{ marginBottom: "1rem" }}>Select the game difficulty</Box>
      <RadioGroup
        onValueChange={(value) => {
          setToDifficulty(difficultyOptions[value]);
        }}
        value={difficulty.name}
        aria-label="Game difficulty"
      >
        <RadioGroupItem
          selected={difficulty.name === "beginner"}
          value="BEGINNER"
          aria-label="Beginner"
        >
          <DifficultyCard difficulty={difficultyOptions.BEGINNER} />
        </RadioGroupItem>
        <RadioGroupItem
          selected={difficulty.name === "intermediate"}
          value="INTERMEDIATE"
          aria-label="Intermediate"
        >
          <DifficultyCard difficulty={difficultyOptions.INTERMEDIATE} />
        </RadioGroupItem>
        <RadioGroupItem
          selected={difficulty.name === "expert"}
          value="EXPERT"
          aria-label="Expert"
        >
          <DifficultyCard difficulty={difficultyOptions.EXPERT} />
        </RadioGroupItem>
      </RadioGroup>
    </Box>
  );
};

const StyledRadioGroup = styled(RadioGroupPrimitive.Root, {
  display: "inline-flex",
  gap: "1rem",
  borderRadius: "2px",
});

const StyledItem = styled(RadioGroupPrimitive.Item, {
  all: "unset",
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
  height: "8rem",
  width: "5rem",

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

const Box = styled("div");

const DifficultyCard = ({ difficulty }) => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box>
        {difficulty.dimSize} x {difficulty.dimSize} <br />
        Board
      </Box>
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        <span>{difficulty.bombNumber}</span> <GearIcon aria-label="bombs" />
      </Box>
    </Box>
  );
};

const RadioGroup = StyledRadioGroup;
const RadioGroupItem = StyledItem;

export default DifficultySelector;

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { styled } from "stitches.config";
import { useDifficultyStore, difficultyOptions } from "../lib/store";
import { GearIcon } from "@radix-ui/react-icons";
