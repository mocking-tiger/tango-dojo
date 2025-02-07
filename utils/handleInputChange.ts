import { SetStateAction } from "react";

export const handleInputChange = (
  setFormData: (
    value: SetStateAction<{
      email: string;
      name: string;
      password: string;
      confirmPassword: string;
    }>
  ) => void,
  name: string,
  value: string
) => {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
