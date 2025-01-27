import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {CheckboxComponentInterface} from "../constants/Type.ts";
import Label from "./Label.tsx";
import {Fragment} from "react";

type CheckboxProps = {
    component: CheckboxComponentInterface;
    disabled: boolean;
}

function CustomCheckbox(props: CheckboxProps) {
    const { component, disabled } = props
    const { label, options, value: currentValue, required } = component

    return (
        <Fragment>
            <Label label={label} required={required} />
            <FormGroup style={{ flexDirection: "row", alignItems: "center" }}>
                {options.map((option, index) => {
                    const {label, value} = option
                    return (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox value={value} disabled={disabled} checked={value == Number(currentValue)}/>}
                            label={label}
                        />
                    )
                })}
            </FormGroup>
        </Fragment>
    )
}

export default CustomCheckbox;
