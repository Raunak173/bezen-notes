import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(0),
    },
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

export default function PageSlider({ count, currentPage, setCurrentPage }) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        color="secondary"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
