import { useState, useMemo, useEffect } from 'react';

export const useForm = (initialState = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) => setFormState({ ...formState, [name]: value });

  const resetForm = () => setFormState(initialState);

  const formValidation = useMemo(
    () =>
      Object.keys(formValidations).reduce((acc, formField) => {
        const [fn, errorMessage] = formValidations[formField];
        return {
          ...acc,
          [`${formField}Valid`]: fn(formState[formField]) ? null : errorMessage
        };
      }, {}),
    [formState]
  );

  const isFormValid = useMemo(() => Object.values(formValidation).every(v => v === null), [formValidation]);

  useEffect(() => resetForm(), [initialState]);

  return {
    ...formState,
    ...formValidation,
    formValidation,
    formState,
    isFormValid,
    handleInputChange,
    resetForm
  };
};

// Solución de Fernando con useState y useEffect

// export const useForm = (initialState = {}, formValidations = {}) => {
//   const [formState, setFormState] = useState(initialState);
//   const [formValidation, setFormValidation] = useState({});

//   const handleInputChange = ({ target: { name, value } }) =>
//     setFormState({ ...formState, [name]: value });

//   const resetForm = () => setFormState(initialState);

//   const createValidators = () => {
//     const formCheckedValues = {};

//     for (const formField in formValidations) {
//       const [fn, errorMessage] = formValidations[formField];

//       formCheckedValues[`${formField}Valid`] = fn(formState[formField])
//         ? null
//         : errorMessage;
//     }

//     setFormValidation(formCheckedValues);
//   };

//   useEffect(() => {
//     createValidators();
//   }, [formState]);

//   return {
//     ...formState,
//     ...formValidation,
//     formValidation,
//     formState,
//     handleInputChange,
//     resetForm
//   };
// };
