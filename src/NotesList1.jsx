import React, { useState, useEffect} from "react";
import NoteItem from "./NoteItem1";

const NotesList = ({ notes, changeNote, lightOn, keyId, updateTagArr }) => {
    let Arr = [], k = 0;
    const [tagArr, setTagArr] = useState([]);
   
    const updateArr = (x) => {
        k++;
        x = x.filter((x)=> !Arr.includes(x))
        Arr = [...Arr, ...x];
        if (k == notes.length) {
            setTagArr(Arr); //console.log(tagArr);
        }
    }



    useEffect(() => { updateTagArr(tagArr) }, [tagArr]);
 
      return (
        <div className={'notes_container'} style={{borderColor:'grey', borderRadius:'0px', marginLeft:'0px', backgroundColor:'white'}}>
            <h2 style={{ color: 'black' }}> Notelist</h2>
              {notes.map((note, index) =>
                  <div onClick={(e) => { changeNote(note) }}> <NoteItem note={note} keyId={keyId} lightOn={lightOn} updateArr={updateArr}/> </div>
              )}
        </div>
    )
}

export default NotesList