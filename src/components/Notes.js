/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Note from "./Note";
import PageSlider from "./PageSlider";
import Divider from "@material-ui/core/Divider";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6);
  const notesRef = collection(db, "notes");
  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, []);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalNotes = notes.length;
  const count = Math.ceil(totalNotes / notesPerPage);
  let pinned = currentNotes.filter((note) => note.pin === true);
  let notPinned = currentNotes.filter((note) => note.pin === false);
  return (
    <div className="flex flex-col gap-y-10">
      {pinned.length > 0 && (
        <div className="flex flex-col gap-y-10 items-center">
          <p className="text-3xl font-bold">Pinned Notes:</p>
          <div className="flex flex-wrap justify-center w-[80%] m-auto gap-x-14 gap-y-7 -mt-2">
            {pinned.map((p) => (
              <Note note={p} />
            ))}
          </div>
        </div>
      )}
      {pinned.length > 0 && <Divider />}
      {notPinned && (
        <div className="flex flex-wrap justify-center w-[80%] m-auto gap-x-14 gap-y-7 -mt-2 pb-14">
          {notPinned.map((p) => (
            <Note note={p} />
          ))}
        </div>
      )}
      <div className="fixed bottom-1 md:left-[45%] left-[25%]">
        <PageSlider
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Notes;
