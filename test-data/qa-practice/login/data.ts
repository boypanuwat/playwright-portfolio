import { getDemoAccount, type LoginAccount } from "../../../config/accounts";

export function validLogin(): LoginAccount {
  return getDemoAccount();
}

export function emptyLogin(): LoginAccount {
  return {
    email: "",
    password: ""
  };
}

export function loginWithoutEmail(): LoginAccount {
  return {
    email: "",
    password: getDemoAccount().password
  };
}

export function loginWithoutPassword(): LoginAccount {
  return {
    email: getDemoAccount().email,
    password: ""
  };
}

export function loginWithWrongPassword(): LoginAccount {
  return {
    email: getDemoAccount().email,
    password: "wrongPassword"
  };
}

export function loginWithInvalidEmailFormat(): LoginAccount {
  return {
    email: "admin",
    password: getDemoAccount().password
  };
}
