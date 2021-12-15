import { makeStyles, createTheme } from "@material-ui/core/styles";

export const THEME = createTheme({
  typography: {
    fontFamily: "BenchNine, sans-serif",
    fontSize: 24,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    colorSecondary: "red",
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundImage: "linear-gradient(hsl(73, 15%, 96%), hsl(103, 70%, 71%))",
    alignContent: "flex-start",
    boxShadow: "none",
    fontWeight: 700,
    overflowY: "scroll",
    position: "relative",
    zIndex: 1,

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },

    [theme.breakpoints.down("xs")]: {
      paddingTop: 120,
      paddingBottom: 30,
    },
  },
  heading: {
    fontSize: 13,
    fontWeight: 700,
    [theme.breakpoints.down("md")]: {},
  },
  paragraph: {
    // fontSize: 28,
    fontWeight: "bald",
    letterSpacing: 0.8,
    color: "hsl(240, 6%, 30%)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
    // maxWidth: "50rem",
    height: 200,
    // padding: " 60px 20px",
    borderRadius: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: 475,
      height: "100%",
      padding: 0,
      overflow: "visible",
    },
    [theme.breakpoints.down("md")]: {
      margin: 25,
    },
    gridImages: {
      maxWidth: 400,
    },
  },
  accordionContainer: {
    fontFamily: "Concert One, sans-serif",

    width: "100%",
    [theme.breakpoints.up("xl")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "50px 20px 0px 20px",
      minWidth: "fit-content",
      margin: 30,
      "& h4": {
        textAlign: "center",
      },
    },
  },
}));
