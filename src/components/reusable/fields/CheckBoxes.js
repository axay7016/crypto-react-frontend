import React, { useState } from 'react'

const CheckBoxes = () => {
    // With this useState I wan't to collect the checked checkboxes
    const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

    // This is my handler method that gets triggered when a checkbox get's checked/unchecked
    // ..and toggles the state of the checkbox
    const handleCheckboxChange = (data) => {
        const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.value === data.value)
        if (isChecked) {
            setCheckedCheckboxes(
                checkedCheckboxes.filter(
                    (checkedCheckbox) => checkedCheckbox.value !== data.value
                )
            );
        } else {
            setCheckedCheckboxes(checkedCheckboxes.concat(data));
        }
    };

    const receivedData = [{ value: "A" }, { value: "B" }, { value: "C" }];

    return (
        <>
            <div className="checkboxes">
                <h1>Checkboxes:</h1>
                {receivedData?.map((data, index) => (
                    <input
                        key={`cb-${index}`}
                        value={data.value}
                        type="checkbox"
                        checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.value === data.value)}
                        onChange={() => handleCheckboxChange(data)}
                    />
                ))}
            </div>
            <div>
                <pre>{JSON.stringify(checkedCheckboxes, null, 2)}</pre>
            </div>
        </>
    )
}

export default CheckBoxes