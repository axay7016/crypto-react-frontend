
const TextArea = (props) => {


    const { value, name, onChange, onFocus, labelFor, labelName, id, placeholder, cols, rows } = props;


    return (
        <div className="single-input">
            <label htmlFor={labelFor}>{labelName}</label>
            <textarea id={id} name={name} placeholder={placeholder} value={value}
                cols={cols} rows={rows}
                onChange={onChange} onFocus={onFocus}
            >
            </textarea>
        </div>


    )
}

export default TextArea