const isStringEmpty = (string: string) => {
    return !string || string.trim().length === 0
}

export {
    isStringEmpty
}
