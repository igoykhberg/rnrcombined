import { inputRegex, mregex } from './regex';

export const delay = (ms = 1515) => {
  return new Promise((resolve) => {
    console.log('delaying.............');
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export const isValidInput = (input: string) => {
  return inputRegex.test(input);
};

export const containsDangerousCharacters = (input: string) => {
  return mregex.test(input);
};
