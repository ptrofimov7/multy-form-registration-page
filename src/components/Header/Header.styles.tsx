import { styled } from "@mui/system";

export const HeaderContainer = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  zIndex: 100,
  width: "100%",
  height: "92px",
  //backgroundColor: theme.palette.primary.main,
  //boxShadow: "0 5px 10px rgba(37,40,41,.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  transition: "all .5s",
  padding: "0 5%",
}));

export const HeaderLogo = styled("img")(({ theme }) => ({
  maxWidth: "140px",
  transition: "all .5s",

  [theme.breakpoints.up("sm")]: {
    maxWidth: "180px",
  },
}));

// export const HeaderLangButton = styled("button")(({ theme }) => ({
//   maxWidth: "180px",
//   backgroundColor: "transparent",
//   border: "none",
//   cursor: "pointer",
//   fontSize: "24px",
//   //color: theme.palette.common.white,
//   fontWeight: 700,
// }));
