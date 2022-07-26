export const hexToBytes = (hexString: string): Uint8Array => {
    // @ts-ignore
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
};

export const base64 = {
    decode: (s: any) => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
    encode: (b: any) => {
        //@ts-ignore
        return btoa(String.fromCharCode(...new Uint8Array(b)));
    },
};
