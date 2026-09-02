export type RegisterData = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export function validRegistration(): RegisterData {
  return {
    firstName: "Somchai",
    lastName: "Tester",
    phone: "0812345678",
    country: "Thailand",
    email: "qa.user@example.com",
    password: "Test123!",
    acceptTerms: true
  };
}

export function registrationWithoutTerms(): RegisterData {
  return {
    ...validRegistration(),
    acceptTerms: false
  };
}

export function registrationWithoutEmail(): RegisterData {
  return {
    ...validRegistration(),
    email: ""
  };
}

export function registrationWithoutPassword(): RegisterData {
  return {
    ...validRegistration(),
    password: ""
  };
}

export function registrationWithoutEmailAndPassword(): RegisterData {
  return {
    ...validRegistration(),
    email: "",
    password: ""
  };
}
