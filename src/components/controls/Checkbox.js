import { FormControl, FormControlLabel, Checkbox as MuiCheckbox} from '@material-ui/core';
import React from 'react'

export default function Checkbox(props) {

    const {name, label, value, onChange} = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
// convertToDefEventPara () and onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
// allow box to be "checked"
// earlier error: there is no 'value' parameter in e.target; needs a 'checked' property

    return (
       <FormControl>
            <FormControlLabel
                control = {<MuiCheckbox
                    name={name}
                    color ="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label = {label}
            />

       </FormControl>
    )
}
