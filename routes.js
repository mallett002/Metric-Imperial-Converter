const convertHandler = require('./convertHandler');

module.exports = (app) => {
    app.route('/api/convert')
        .get((req, res) => {
            const input = req.query.input;
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const returnNum = convertHandler.convert(initNum, initUnit);
            const returnUnit = convertHandler.getReturnUnit(initUnit);
            const stringResponse = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
            res.json(stringResponse);
        });
};