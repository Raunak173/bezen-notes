/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: "#ffd500",
  },
  con: {
    backgroundColor: "#3A5BA0",
    width: 350,
    height: 250,
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    rowGap: 10,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
}));

const Note = ({ note }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.con}>
        <Link to={`/${note.id}`} state={{ note: note }}>
          <div className="bg-[#FFA500] flex justify-around items-center w-[300px] lg:w-[350px] h-[50px] md:text-xl text-black rounded-l-lg rounded-r-lg">
            <p>{note.title}</p>
          </div>
        </Link>
        <Chip
          label={`${note.tagline}`}
          variant="outlined"
          className={classes.chip}
        />
        <p className="overflow-hidden h-[200px]">{note.content}</p>
      </div>
    </>
  );
};

export default Note;
