import React, { useState, useEffect } from 'react';
import search from './Images/search_icon.svg'

const SearchInput = ({ setSearch, tagArr }) => {

    const [tag, setTag] = useState("");
    let [showTag, setST] = useState([]);
    const showTags = (x) => {
        let res = tagArr.filter((tag) => tag.indexOf(x) == 0);
        console.log(res);
        setST([...res]);
    }

    useEffect(() => {showTags(tag)},[tag])

    return (
        <div className="input">
            <img src={search} onClick={() => setSearch(tag)} />
            <input type="text" placeholder="Enter tag" value={tag} onKeyDown={(e) => {if (e.keyCode == 13) { setSearch(tag); console.log(tag) } }} onChange={(e) => setTag(e.target.value)} />
            {showTag.map((tag) => <div onClick={(e) => {setTag(e.target.innerText) }}> {tag} </div>)}
        </div>
    )
}

export default SearchInput