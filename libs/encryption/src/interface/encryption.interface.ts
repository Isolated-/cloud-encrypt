export interface IEncryption {
  encrypt(plain: string): Promise<string> | string;
  compare(plain: string, encrypted: string): Promise<boolean> | boolean;
}
