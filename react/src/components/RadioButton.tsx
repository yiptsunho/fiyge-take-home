import FormControl from "@mui/material/FormControl";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {RadioButtonComponentInterface} from "../constants/Type.ts";
import Label from "./Label.tsx";

type RadioButtonProps = {
    component: RadioButtonComponentInterface;
    disabled: boolean;
}

function RadioButton(props: RadioButtonProps) {
    const { component, disabled } = props
    const { label, options, value, required } = component

    return (
        <FormControl style={{ flexDirection: "row", alignItems: "center" }}>
            <Label label={label} required={required} />
            <RadioGroup
                defaultValue="female"
                // value={value}
                row
            >
                {options.map((option, index) => {
                    const { value, label } = option
                    return <FormControlLabel key={index} value={value} control={<Radio disabled={disabled}/>} label={label} />
                })}
                {/*{options.length === 0 &&*/}
                {/*    <Fragment>*/}
                {/*        <FormControlLabel key={0} value={0} control={<Radio />} label="Option 1" />*/}
                {/*        <FormControlLabel key={1} value={1} control={<Radio />} label="Option 2" />*/}
                {/*        <FormControlLabel key={2} value={2} control={<Radio />} label="Option 3" />*/}
                {/*    </Fragment>*/}
                {/*}*/}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButton;
