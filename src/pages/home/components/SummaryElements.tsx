import { FC, PropsWithChildren } from "react";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const Heading: FC<PropsWithChildren> = ({ children }) => {
  if (children === undefined) return null;
  const {
    palette: { mode },
  } = useTheme();
  return (
    <Typography
      variant="subtitle2"
      bgcolor={mode === "light" ? "lightgrey" : "#1e1e1e"}
      pl={1}
    >
      {children}
    </Typography>
  );
};

export const HeadingWithoutBackground: FC<PropsWithChildren> = ({
  children,
}) => {
  if (children === undefined) return null;

  return (
    <Typography variant="body2" color="#a5a5a5">
      {children}
    </Typography>
  );
};

export const ItemNumberRow: FC<{
  heading?: string;
  value: number;
  negativeInPrimaryColor?: true;
  positiveInGreenColor?: true;
}> = ({ heading, value, negativeInPrimaryColor, positiveInGreenColor }) => {
  const {
    palette: {
      text: { primary },
    },
  } = useTheme();
  return (
    <>
      <HeadingWithoutBackground>{heading}</HeadingWithoutBackground>
      <Typography
        variant="h6"
        color={
          value < 0 && !negativeInPrimaryColor
            ? "red"
            : value > 0 && positiveInGreenColor
            ? "green"
            : primary
        }
      >
        {value.toLocaleString()}
      </Typography>
    </>
  );
};

export const ItemStack: FC<{
  heading?: string;
  title: string;
  value: number;
  negativeInPrimaryColor?: true;
  positiveInGreenColor?: true;
}> = ({
  heading,
  title,
  value,
  negativeInPrimaryColor,
  positiveInGreenColor,
}) => {
  const {
    palette: {
      text: { primary },
    },
  } = useTheme();
  return (
    <>
      {heading !== undefined ? <></> : <></>}
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="body2" color="#a5a5a5">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color={
            value < 0 && !negativeInPrimaryColor
              ? "red"
              : value > 0 && !!positiveInGreenColor
              ? "green"
              : primary
          }
        >
          {value.toLocaleString()}
        </Typography>
      </Stack>
    </>
  );
};
