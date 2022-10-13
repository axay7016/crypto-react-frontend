

const InputTextRef = (props) => {


    const { id, type, ref, placeholder, onFocus, labelFor, labelName, } = props;

    return (
        <div className="single-input">
            <label htmlFor={labelFor}>{labelName}</label>
            <input id={id} type={type} ref={ref} placeholder={placeholder} onFocus={onFocus} />
        </div>


    )
}

export default InputTextRef