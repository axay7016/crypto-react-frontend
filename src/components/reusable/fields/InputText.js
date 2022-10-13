

const InputText = (props) => {


    const { type, name, value, onChange, onFocus, labelFor, labelName, id, placeholder,className='' } = props;


    return (
        <div className={`single-input ${className}`}>
            <label htmlFor={labelFor}>{labelName}</label>
            <input type={type} name={name} value={value} onChange={onChange}
                onFocus={onFocus} id={id} placeholder={placeholder}
            />
        </div>


    )
}

export default InputText