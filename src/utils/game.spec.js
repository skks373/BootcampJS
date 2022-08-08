import { computeBoardPosition } from "./game";

describe("Game util", () => {
    it("it should compute 0", () => {
        const result = computeBoardPosition(0, 0);
        
        expect(result).toBe(0);
    })
    it("it should be Infinity", () => {
        const result = computeBoardPosition(Infinity, 0);
        
        expect(result).toBe(Infinity);
    })
    it("it should compute 4", () => {
        const result = computeBoardPosition(2, 2);
        
        expect(result).toBe(4);
    })
    
});