import React, { useState, useEffect } from "react";


const NoteItem = ({ note,  lightOn, updateArr, keyId}) => {
    const arrWord = note.text.split(' ');
    const arrTitle = note.title.split(' ');
    const [tagArr, setTagArr] = useState([...arrTitle.filter((arr) => arr[0] == '#'), ...arrWord.filter((arr) => arr[0] == '#')]);
    const [style, setStyle] = useState("noteItem")
    useEffect(() => {
        setTagArr([...arrTitle.filter((arr) => arr[0] == '#'), ...arrWord.filter((arr) => arr[0] == '#')]);
        updateArr(tagArr);
    }, [keyId])


    useEffect(() => {
        if (note.vision == false) { setStyle("invisible") }
        else if (keyId == note.id) { setStyle('lightOn') }
        else if (note.vision == true) { setStyle("noteItem") }
    }, [note, keyId])
    return (
        <div className={style}>
            <div className={'titleNote'}>{arrTitle.map((word) => <>
                <span className={(word[0] == '#' && style == 'lightOn' && note.id == lightOn) ? 'spanTag' : 'textNote'}>{word.match(/\S/g)}</span> <span> </span> </>
            )}</div>
            <div className={'textNote'}>{arrWord.map((word) => <>
                <span className={(word[0] == '#' && style == 'lightOn' && note.id == lightOn) ? 'spanTag' : 'textNote'}>{word.match(/\S/g)}</span> <span> </span> </>
            )}</div>
            <div className={'textNote'}>{tagArr.map((word) => <>
                <span className={'spanTag'}>{word.match(/\S/g)}</span> <span> </span> </>
            )}</div>
        </div>
    )
}

export default NoteItem