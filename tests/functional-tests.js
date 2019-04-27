const chaiHTTP = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

chai.use(chaiHTTP);

describe('Route Tests', () => {
    const invalidText = JSON.stringify({
        "error":"invalid number",
        "example":"Valid number examples: 5, 5.5, 5.3/6, 5.7/9.75"
    });

    describe('GET /api/convert => conversion object', () => {
        it('Converts 10L with valid input', (done) => {
            chai.request(app)
                .get('/api/convert')
                .query({input: '10L'}) // chain query parameters
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.initNum).to.equal(10);
                    expect(res.body.initUnit).to.equal('L');
                    expect(res.body.returnNum).to.be.closeTo(2.64172, 0.1);
                    expect(res.body.returnUnit).to.equal('gal');
                    done();
                });
        });

        it('handles invalid units', (done) => {
            chai.request(app)
                .get('/api/convert')
                .query({input: '32g'})
                .end((err, res) => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('handles invalid numbers', (done) => {
            chai.request(app)
                .get('/api/convert')
                .query({input: '3/7.2/4kg'})
                .end((err, res) => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal(invalidText);
                    done();
                });
        });

        it('handles invalid numbers and units', (done) => {
            chai.request(app)
                .get('/api/convert')
                .query({input: '32/2./23chocolates'})
                .end((err, res) => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal(invalidText);
                    done();
                });
        });

        it('handles no number given in input', (done) => {
            chai.request(app)
                .get('/api/convert')
                .query({input: 'potatoes'})
                .end((err, res) => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal(invalidText);
                    done();
                });
        });
    });
});
