let validationMessages: string[] = [];

const validateName = (value: string) => {
  if (value.length > 2 && /^[A-Za-z\s]*$/.test(value)) {
    return true;
  } else {
    validationMessages.push("Name nicht gültig");
    return validationMessages;
  }
};
export const validateEmail = (value: string) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 5) {
    return true;
  } else {
    validationMessages.push("Email nicht gültig");
    return validationMessages;
  }
};
const validatePassword = (value: string) => {
  if (value.length > 8 && value.length < 15) {
    return true;
  } else {
    validationMessages.push("Passwort nicht gültig");
    return validationMessages;
  }
};
const validateRepeatPassword = (value1: string, value2: string) => {
  if (value1 === value2) {
    return true;
  } else {
    validationMessages.push("Passwort nich gleich");
    return validationMessages;
  }
};

export const validateRegister = (
  input_name: string,
  input_email: string,
  input_password: string,
  input_repeatPassword: string
) => {
  validationMessages  = [];
  validateName(input_name);
  validateEmail(input_email);
  validatePassword(input_password);
  validateRepeatPassword(input_password, input_repeatPassword);

  return validationMessages;
};
