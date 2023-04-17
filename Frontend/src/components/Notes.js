import React, { useEffect, useState } from "react"; //hooks
import NoteForm from "./NoteForm";
import GetNotes from "./GetNotes";
import EditModal from "./EditModal";
import axios from "axios";
import { useNavigate } from 'react-router'




function Notes() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [notes, setNotes] = useState();
  const [edit, setedit] = useState("");

  useEffect(() => {
    // if("userData" in localStorage){
      fetchData(); 
    // }else{
    //   navigate('/Login');
    // }
   
  }, []);

  async function fetchData() {
    await axios
      .get(
        `http://localhost:8080/note/display/${1}`
      )
      .then((result) => {
        setNotes(result.data);
        console.log(notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <NoteForm
        title={title}
        settitle={settitle}
        description={description}
        setdescription={setdescription}
        notes={notes}
        setNotes={setNotes}
        fetchData={fetchData}
      />
      <div className="container">
        <div className="row justify-content center">
          <div className="col-md-10">
            <h1 className="mb-3">Your Notes</h1>
            {notes ? (
              notes.map((note) => (
                <GetNotes
                  setedit={setedit}
                  key={note.id}
                  note={note}
                  fetchData={fetchData}
                />
              ))
            ) : (
              <p>No Notes To Display</p>
            )}
          </div>
        </div>
      </div>
      <EditModal edit={edit} fetchData={fetchData} />
    </>
  );
}

export default Notes;
