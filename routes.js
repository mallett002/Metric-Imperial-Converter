const convertHandler = require('./convertHandler');

module.exports = (app) => {
    app.route('/api/convert')
        .get((req, res) => {
            const input = req.query.input;

            if (!input) {
                return res.status(400).send({error: 'You must enter a value'});
            }
            const initNum = convertHandler.getNum(input);

            if (!initNum) {
                return res.status(400).send({
                    error: 'invalid number',
                    example: 'Valid number examples: 5, 5.5, 5.3/6, 5.7/9.75'
                });
            }

            const initUnit = convertHandler.getUnit(input);

            if (!initUnit) {
                return res.status(400).send({
                    error: 'You must enter a valid unit',
                    example: 'mi, km, L, gal, lbs, kg'
                });
            }

            const returnNum = convertHandler.convert(initNum, initUnit);
            const returnUnit = convertHandler.getReturnUnit(initUnit);
            const stringResponse = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
            res.json(stringResponse);
        });
};
