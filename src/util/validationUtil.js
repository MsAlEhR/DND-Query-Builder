function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce(
    (errors, error) => ({
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }),
    {},
  );
}

export function validate(getValidationSchema, intl) {
  return values => {
    const validationSchema = getValidationSchema(values, intl);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
}
