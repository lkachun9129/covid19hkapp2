export class StringUtility {
    /**
     * Convert a UTF8 array to string
     * @param data uint8 array
     */
    public static fromUTF8Array(data: number[]): string {
        let str = '';

        for (let i = 0; i < data.length; i++) {
            let value: number = data[i];

            if (value < 0x80) {
                str += String.fromCharCode(value);
            } else if (value > 0xBF && value < 0xE0) {
                str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
                i += 1;
            } else if (value > 0xDF && value < 0xF0) {
                str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
                i += 2;
            } else {
                // surrogate pair
                var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;
                str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
                i += 3;
            }
        }

        return str;
    }

    /**
     * Convert a string to array
     * @param input - input string
     */
    public static toArray(input: string): number[] {
        let bytes: number[] = [];
        for (var i = 0; i < input.length; ++i) {
            bytes[i] = input.charCodeAt(i);
        }
        return bytes;
    }

    /**
     * Indicates whether the specified string is null or an empty string ("")
     * @param input - input string
     */
    public static isNullOrEmpty(input: string): boolean {
        return (input === null || input === undefined || input === '');
    }

}
