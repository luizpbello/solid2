import { IValidationsProvider } from "../IValidationsProvider";

export class ValididationProvider implements IValidationsProvider {
  isEqual(valueA: string, valueB: string, msg: string): void {
    if (valueA != valueB) throw new Error(msg);
  }

  existsOrError(value: string | any[], msg: string): void {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new Error(msg);
    }

    if (typeof value === "string" && !value.trim()) {
      throw new Error(msg);
    }
  }

  isValidEmail(email: string, msg:string): void {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const result = pattern.test(email);

    if (result === false) throw new Error(msg);
  }
}
