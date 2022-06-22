import React, {useEffect, useState} from 'react'
import NotesList from "./NotesList1";
import SearchInput from './SearchInput'
import './styleshit.css'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs';


async function senData(x) {
    const options = { cacheControl: '3600', upsert: false }
    const supabaseUrl = 'https://kipgojxgvnxqtnuaukqu.supabase.co'
    const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpcGdvanhndm54cXRudWF1a3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyODc4ODcsImV4cCI6MTk3MDg2Mzg4N30.Jlvw1lHv26K5ZRGjNFYO0ottk0c-7l5LKHb6HX28yNQ')
    writeFileSync('data.json', x);
        const { data, error } = await supabase
            .storage
            .from('data')
            .update('data.json', 'file', options)
    } 



/*function senData(x) {
   // let data = x;
    let url = 'https://mvdxclcuxttisdditywi.supabase.co/storage/v1/object/public/data/data.json?t=2022-06-15T09%3A40%3A08.010Z';
    console.log(JSON.stringify(x));
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(x)
    })
        .then(response => response.ok ? response.json() : response.status)
        .then(result => console.log(result));
    const { data, error } = await supabase
        .storage
        .updateBucket('data', { public: false })


}*/

const Notes = () => {
    const [but, setBut] = useState(false);
    const [edit, setE] = useState(true);
    const [lightOn, setLO] = useState(-1)
    const [tagArr, setTagArr] = useState([])
    const [keyId, setKeyId] = useState(-1);
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState({ title: '', text: '', vision: true })

    const setSearch = (x) => {
        if (x == '') notes.map((note) => note.vision = true)
        notes.map((note) => {
           // console.log(note.title, note.text);
            if (note.title.includes(x) || note.text.includes(x)) note.vision = true;
            else note.vision = false;
          //  console.log(note.vision);
        });
        setKeyId(Date.now()+3);
    }
    
    const addNewNote = (e) => {
        e.preventDefault()
        if (!but) {
            if (note.title === '')
                alert('Input note title!')
            else {
             
                setNotes([...notes, { ...note, id: Date.now() }])
                setKeyId(Date.now()-2);
            }
        }
        else alert("Fail");
    }

    const editNote = (e) => {
        e.preventDefault()
        if (but) {
            notes.map((p, index) => { if (p.id == keyId) { p.title = note.title; p.text = note.text } });
            setBut(false);
            setKeyId(-1);
            setE(true);
            setLO(-1);
        }
        else alert("You are faggot");
    }

    const changeNote = (not) => {
        setNote({ title: not.title, text: not.text, date: not.date })
        setKeyId(not.id);
        setBut(true);
    }


    const deleteNote = (e) => {
        e.preventDefault()
        if (but) {
            setNotes(notes.filter((p, index) => index !== 0))
            setBut(false);
            setKeyId(-1);
        }
        else alert("You are faggot");
    }

    const editMode = (edit) => {
        if (edit) setLO(keyId);
        else setLO(-1);
    }

    const updateTagArr = (x) => {
        setTagArr(x);
    }

   // senData();
   useEffect(() => senData(notes),[notes])

    return (
        <div>
            <form className={'noteForm'} style={{margin:'0px', backgroundColor:'white'}}>
                <h2 style={{ color: 'black' }}>Notes</h2>
                <input style={{ borderColor: 'grey', borderRadius: '0px', marginLeft: '0px' }}
                    className={'noteInput'}
                    type="text"
                    placeholder={'Title'}
                    value={note.title}
                    onFocus={() => { setE(false); editMode(edit) }}
                    onBlur={() => { setE(true); editMode(edit) }}
                    onChange={e => setNote({...note, title: e.target.value})}
                />
                <textarea style={{ borderColor: 'grey', borderRadius: '0px', marginLeft: '0px' }}
                    className={'noteInput'}
                    type="text"
                    placeholder={'Description'}
                    value={note.text}
                    onFocus={() => { setE(false); editMode(edit) }}
                    onBlur={() => { setE(true); editMode(edit) }} 
                    onChange={e => setNote({ ...note, text: e.target.value })}
                />
             
                
                <>
                    <button className={'noteBtn'} onClick={addNewNote} style={{}}> New note</button>
                    <button className={'noteBtn'} onClick={deleteNote}  style={{ }}> Delete </button>
                    <button className={'noteBtn'} onClick={editNote}  style={{ }}> Edit </button>
            </>
          
            </form>
            <br/>

            <NotesList changeNote={changeNote} updateTagArr={updateTagArr} lightOn={lightOn} keyId={keyId} notes={notes} />
            <SearchInput tagArr={tagArr} setSearch={setSearch} />
        </div>
    )
}

export default Notes