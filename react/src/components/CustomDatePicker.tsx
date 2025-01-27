import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DatePickerComponentInterface} from "../constants/Type.ts";
import {Fragment} from "react";
import Label from "./Label.tsx";
import dayjs from "dayjs"

type CustomDatePickerProps = {
    component: DatePickerComponentInterface;
    disabled: boolean;
}

function CustomDatePicker(props: CustomDatePickerProps) {
    const { component, disabled } = props
    const { label, value, required } = component

    return (
        <Fragment>
            <Label label={label} required={required} />
            <DatePicker
                value={value ? dayjs(value) : null}
                sx={{ width: "100%" }}
                disabled={disabled}
            />
        </Fragment>
    )
}

export default CustomDatePicker;
