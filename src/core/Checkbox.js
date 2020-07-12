import React, { useState } from 'react';

const Checkbox = ({ categories,handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //tra ve first index hoac -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        //neu current checked chua san sang trong state ->push nguoc lai thi pull / go bo
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input" />
            <label className="form-check-label">{c.name}</label>

        </li>
    ));
}

export default Checkbox;