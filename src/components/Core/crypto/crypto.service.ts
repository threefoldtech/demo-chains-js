export const hexToBytes = (hexString: string): Uint8Array => {
    // @ts-ignore
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
};
