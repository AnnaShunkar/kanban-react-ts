import type { EncryptedPayload } from "../types";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function getStoredKey(): Promise <CryptoKey> {
    const keyData = localStorage.getItem("aesKey");
    
  if (keyData) {
    const rawKey = Uint8Array.from(JSON.parse(keyData) as number[]);
    return await crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"]
    );
    } 
    
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const rawKey = await crypto.subtle.exportKey("raw", key);
    localStorage.setItem("aesKey", JSON.stringify(Array.from(new Uint8Array(rawKey))));

    return key;
}

export async function encryptData<T>(
    data: T,
    key: CryptoKey): Promise<EncryptedPayload> {
    
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const iv = crypto.getRandomValues(new Uint8Array(12));
    
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  
  return { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
}

export async function decryptData<T>(
    encrypted: EncryptedPayload,
    key: CryptoKey): Promise<T> {
    
  const iv = new Uint8Array(encrypted.iv);
  const data = new Uint8Array(encrypted.data);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return JSON.parse(new TextDecoder().decode(decrypted)) as T;
}

