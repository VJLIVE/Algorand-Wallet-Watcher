import { base32 } from "multiformats/bases/base32";
import { CID } from "multiformats/cid";
import { create } from "multiformats/hashes/digest";

/**
 * Convert Algorand reserve address (base32) to IPFS CID (v1 base32).
 * Used in ARC19 `template-ipfs://{ipfscid:...}` format.
 */
export function algorandReserveToCID(reserveAddr: string): string {
  const decoded = decodeAlgorandAddress(reserveAddr);

  const digest = create(0x12, decoded); // 0x12 = sha2-256
  const cid = CID.createV1(0x55, digest); // 0x55 = raw

  return cid.toString(base32);
}

function decodeAlgorandAddress(addr: string): Uint8Array {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const map: Record<string, number> = {};
  for (let i = 0; i < ALPHABET.length; i++) {
    map[ALPHABET[i]] = i;
  }

  let bits = 0;
  let value = 0;
  const bytes = [];

  for (const char of addr) {
    value = (value << 5) | map[char];
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >> bits) & 0xff);
    }
  }

  return new Uint8Array(bytes.slice(0, 32)); // strip checksum
}
