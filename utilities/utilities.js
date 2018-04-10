const isEmpty = (val) => val === undefined || val === null || val.length <= 0 || Object.keys(val).length === 0;
const lower = value => value && value.toLowerCase();
const upper = value => value && value.toUpperCase();

export { isEmpty, lower, upper };