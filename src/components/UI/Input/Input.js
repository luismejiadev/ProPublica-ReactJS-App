import React from 'react'

const input = (props) => {
  let inputElem = null;
  const className = 'InputElement form-control'
  switch (props.elementType){
    case ('select'):
      const emptyOption = ((props.placeHolder)?<option value="">{props.placeHolder}</option> : null)
      inputElem = (
        <select className={className} onChange={props.changed} value={props.value}>
          {emptyOption}
          {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            )
          )}
        </select>
      );
      break;
    case ('textarea'):
      inputElem = <textarea
        className={className}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('range'):
      inputElem = [<input
        key='input'
        type={props.elementType}
        className={props.className || className}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />,
        <label key='label'>{props.value}</label>
        ]
        break;

    default:
      inputElem = <input
        type={props.elementType}
        className={props.className || className}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }
  return (props.noWrapper)? (inputElem):(
    <div className={"Input form-group " + props.className}>
      <label>{props.label}</label>
      {inputElem}
      {(props.labelAfterInput)?props.labelAfterInput:null}
    </div>
  )
}

export default input