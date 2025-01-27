import Typography from "@mui/material/Typography";

type LabelProps = {
    label: string | null;
    required: boolean;
}

function Label(props: LabelProps) {
    const { label, required } = props

    return (
        <Typography variant="h6" component="h2" mr={2} textAlign="start" whiteSpace="nowrap">
            {required && <span style={{ color: "red" }}>*</span>}{label}:
        </Typography>
    )
}

export default Label;
