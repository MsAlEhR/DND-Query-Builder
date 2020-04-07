import theme from "../../theme/theme";

const styles = theme => ({
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "-1",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: "#1d1d1d",
      opacity: ".8"
    }
  },
  item: {
    position: "relative",
    // display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "#fff"
    },
    "&$selected": {
      width: "auto",
      transition: "all 500ms linear",
      // margin: "10px 15px 0",
      borderRadius: "3px",
      position: "relative",
      // display: "block",
      padding: "10px 10px",
      backgroundColor: theme.palette.primary.light
    }
  },
  itemText: {
    "&:hover,&:focus,&:visited,&": {
      color: "#fff"
    }
  },
  selected: {},
  itemIcon: {
    color: "#fff"
  },
  iscStyle: {
    color: theme.palette.primary.contrastText,
    padding: "0 10px"
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    // display: "block",
    padding: "10px 15px",
    backgroundColor: theme.palette.primary.light
  },
  nested: {
    marginRight: "8px"
  }
});

export default styles;
