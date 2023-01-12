import React, {useState} from 'react';
import addAvatar from '../../img/addAvatar.png';
import s from './formInput.module.scss'

const FormInput = (props) => {
  const [fileText, setFileText] = useState('');
  const [focused, setFocused] = useState(false);
  const {id, name, type, placeholder,required, errorMessage, pattern, label, handleChange, value} = props
  if(props.type !== 'file') return (
    <div className={s.inputField}>
      <input
        value={value}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        focused={focused.toString()}
        pattern={pattern}
        onChange={handleChange}
        onBlur={()=> setFocused(true)}
        onFocus={() => name === 'confirmPassword' && setFocused(true)}
      />
      <span>{errorMessage}</span>
    </div>
  )
  return (
    <div className={s.inputField}>
      <label htmlFor={id}>
        <img src={addAvatar} alt="add Avatar"/>
        {fileText ?
          <p>{fileText}</p>
          :
          <p>{label}</p>
          }
      </label>
      <input
        onClick={() => name === 'file' && setFocused(true)}
        required={required}
        focused={focused.toString()}
        id={id}
        name={name}
        type={type}
        onChange={(e) => {
          setFileText(e.target.value)
          handleChange(e,e.target.files[0])
        }}
        style={{
          display: "inline-block",
          height: 0,
          padding: 0,
          border: 0,
          "zIndex": -1,
          position: "absolute"
      }}
      />
      <span>{errorMessage}</span>
    </div>

  );
};

export default FormInput;