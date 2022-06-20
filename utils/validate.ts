const validate = {
  validateStatus(status: number): boolean {
    return status === 200 || status === 201 || status === 400 || status === 401 || status === 500;
  },
};

export default validate;
