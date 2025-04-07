import {generateUUID} from '../index.ts';

describe('src > utils > unit > generateUUID', () => {
    it('should generate a UUID of the correct format', () => {
        const uuid = generateUUID();
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(uuid).toMatch(uuidRegex);
    });

    it('should generate unique UUIDs', () => {
        const uuid1 = generateUUID();
        const uuid2 = generateUUID();
        expect(uuid1).not.toBe(uuid2);
    });

    it('should generate a UUID with the correct version number', () => {
        const uuid = generateUUID();
        expect(uuid[14]).toBe('4');
    });

    it('should generate a UUID with the correct variant', () => {
        const uuid = generateUUID();
        const variant = parseInt(uuid[19], 16);
        expect(variant).toBeGreaterThanOrEqual(8);
        expect(variant).toBeLessThanOrEqual(11);
    });
});
