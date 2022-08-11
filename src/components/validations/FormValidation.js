export const required = (value) => (value ? undefined : 'Required');

export const mustBeNumber = (value) => isNaN(value) ? 'Must be a number' : undefined;

export const mustBe8Digit = (value) => 
((String(value).match(/\d/g).length < 6) || (String(value).match(/\d/g).length > 8)) ? 'Must contain between 6 and 8 digits' : undefined; 


export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );