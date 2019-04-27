const expect = require('chai').expect;
const convertHandler = require('../src/convertHandler');

describe('Convert Handler Class', () => {
    describe('Function convertHandler.getNum', () => {
        it('handles a whole number value input', () => {
            // given
            const input = '32L';
            const getNum = convertHandler.getNum;

            // when
            const number = getNum(input);

            // then
            expect(number).to.equal(32);
        });

        it('handles a decimal value input and rounds value to 5 decimal places', () => {
            // given
            const input = '32.7326654L';
            const getNum = convertHandler.getNum;

            // when
            const number = getNum(input);

            // then
            expect(number).to.equal(32.73267);
        });

        it('handles fractional input', () => {
            // given
            const input = '5/8';
            const getNum = convertHandler.getNum;

            // when
            const number = getNum(input);

            // then
            expect(number).to.equal(0.625);
        });

        it('handles fractions with decimals', () => {
            // given
            const input = '4.59/8';
            const getNum = convertHandler.getNum;

            // when
            const number = getNum(input);

            // then
            expect(number).to.equal(0.57375);
        });

        it('returns undefined when no input number is given', () => {
            // given
            const input = 'chocolates';
            const getNum = convertHandler.getNum;

            // when
            const number = getNum(input);

            // then
            expect(number).to.equal(undefined);
        });
    });

    describe('Function convertHandler.getUnit', () => {
        const validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
        const getUnit = convertHandler.getUnit;

        it('parses out the unit when given a valid unit', () => {
            // given
            validUnits.forEach(unit => {
                const actualUnit = getUnit(`132${unit}`);

                expect(actualUnit).to.equal(unit);
            });
        });

        it('handles unknown units', () => {
            const actualUnit = getUnit("235chocolates");
            expect(actualUnit).to.equal(undefined);
        });

        it('handles input with no unit', () => {
            const actualUnit = getUnit("235");
            expect(actualUnit).to.equal(undefined);
        });
    });

    describe('Function convertHandler.getReturnUnit', () => {
        it('', () => {
            const input = ['gal','L','mi','km','lbs','kg'];
            const expected = ['L','gal','km','mi','kg','lbs'];
            const getReturnUnit = convertHandler.getReturnUnit;
            input.forEach((ele, i) => {
                const actualUnit = getReturnUnit(ele);
                expect(actualUnit).to.equal(expected[i]);
            });
        });
    });

    describe('Function convertHandler.spellOutUnit', () => {
        it('spells out the full unit name', () => {
            // given
            const input = ['gal','L','mi','km','lbs','kg'];
            const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

            // when
            const mappedInput = input.map(unit => {
                return convertHandler.spellOutUnit(unit);
            });

            // then
            expect(mappedInput).to.deep.equal(expected);
        });
    });

    describe('Function convertHandler.convert', () => {
        it('converts gal to L', () => {
            // given
            const input = [5, 'gal'];
            const expectedNum = 18.92705;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });

        it('converts L to gal', () => {
            // given
            const input = [5, 'L'];
            const expectedNum = 1.32086;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });

        it('converts mi to km', () => {
            // given
            const input = [5, 'mi'];
            const expectedNum = 8.0467;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });

        it('converts km to mi', () => {
            // given
            const input = [5, 'km'];
            const expectedNum = 3.10686;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });

        it('converts lbs to kg', () => {
            // given
            const input = [160, 'lbs'];
            const expectedNum = 72.57472;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });

        it('converts kg to lbs', () => {
            // given
            const input = [72, 'kg'];
            const expectedNum = 158.73296;

            // when
            const convertedNum = convertHandler.convert(input[0], input[1]);

            // then
            expect(convertedNum).to.equal(expectedNum);
        });
    });
});
