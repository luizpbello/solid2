export interface IValidationsProvider {
    isEqual(valueA:string, valueB:string, message:string):void;
    existsOrError(value:string, message:string):void
    isValidEmail(email:string, msg:string):void
}
