import React from 'react'

const Form = (props) => {
    return (
        <form {...props} noValidate autoComplete="off">
            {props.children}
        </form>
    )
}

export default Form
