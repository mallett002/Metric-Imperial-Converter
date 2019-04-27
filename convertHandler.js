class ConvertHandler {
    constructor() {
      this.getNum = this.getNum.bind(this);
      this.getUnit = this.getUnit.bind(this);
      this.getReturnUnit = this.getReturnUnit.bind(this);
      this.spellOutUnit = this.spellOutUnit.bind(this);
      this.convert = this.convert.bind(this);
      this.getString = this.getString.bind(this);
    }

    getNum(input) {
      const mutlipleSlashReg = /[0-9.?]?(\/)[0-9.?]+(\/)/;
      const inputRegex = /([0-9]+\.?([0-9]+)?)\/?([0-9]+(\.[0-9]+)?)?/;
      const roundRegex = /[0-9]+\.[0-9]{5}?([0-9]+)?/;
      const match = input.match(inputRegex);

      if (input.match(mutlipleSlashReg)) {
        return undefined;
      }

      if (!match) {
        return undefined;
      }

      let num = parseFloat(match[1]);

      if (match[3]) {
        const divisor = parseFloat(match[3]);
        num /= divisor;
      }

      const largeDecimalMatch = num.toString().match(roundRegex);

      if (largeDecimalMatch) {
          num = parseFloat(num.toFixed(5));
      }

      return num;
    }

    getUnit(input) {
      const regex = /[a-z]+$/i;
      const match = input.match(regex);

      if (!match) return undefined;
      if (!this.getReturnUnit(match[0])) return undefined;

      return match[0];
    }

    getReturnUnit(initUnit) {
      const unit = initUnit.toLowerCase();

      switch(unit) {
        case 'gal':
          return 'L';
        case 'l':
          return 'gal';
        case 'lbs':
          return 'kg';
        case 'kg':
          return 'lbs';
        case 'mi':
          return 'km';
        case 'km':
          return 'mi';
        default:
          return undefined;
      }
    }

    spellOutUnit(unit) {
      const lowerCasedUnit = unit.toLowerCase();

      switch(lowerCasedUnit) {
        case 'gal':
          return 'gallons';
        case 'l':
          return 'liters';
        case 'lbs':
          return 'pounds';
        case 'kg':
          return 'kilograms';
        case 'mi':
          return 'miles';
        case 'km':
          return 'kilometers';
        default:
          return 'not a valid unit';
      }
    }

    convert(initNum, initUnit) {
      const galToL = 3.78541; // 1 gal is 3.7 L
      const lbsToKg = 0.453592; // 1 lb is .45 kg
      const miToKm = 1.60934; // 1 mi is 1.6km
      let number = initNum;

      switch(initUnit.toLowerCase()) {
        case 'gal':
          number *= galToL;
          break;
        case 'l':
          number /= galToL;
          break;
        case 'lbs':
          number *= lbsToKg;
          break;
        case 'kg':
          number /= lbsToKg;
          break;
        case 'mi':
          number *= miToKm;
          break;
        case 'km':
          number /= miToKm;
          break;
        default:
          number = NaN;
      }

      if (isNaN(number)) {
          return 'invalid number';
      }

      return Number(number.toFixed(5));
    }

    getString(initNum, initUnit, returnNum, returnUnit) {
     return {
       initNum,
       initUnit,
       returnNum,
       returnUnit,
       string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
     };
    }

  }

  module.exports = new ConvertHandler();
