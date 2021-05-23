import dotenv from 'dotenv';
dotenv.config()

describe('env test', () => {
    it('should have a db uri', () => {
        expect(process.env.DB_URI).toBeDefined();
    });
    it('should have a port', () => {
        expect(process.env.PORT).toBeDefined();
    });
})
