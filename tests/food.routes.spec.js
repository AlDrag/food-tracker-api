// Configure the environment and require Knex
const env = process.env.NODE_ENV || "test";
const config = require("../knexfile")[env];
const server = require("../app/app");
const knex = require("knex")(config);
const PATH = "/api/v1/food";

// Require and configure the assertion library
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);


// Rollback, commit and populate the test database before each test
describe("routes: food", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  // Rollback the migration after each test
  afterEach(() => {
    return knex.migrate.rollback();
  });

  // Here comes the first test
  describe(`GET ${PATH}`, () => {
    it("should return all the resources", done => {
      chai
        .request(server)
        .get(`${PATH}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.data.length).to.equal(3);
          expect(res.body.data[0]).to.have.property("barcode");
          done();
        });
    });
  });

  describe(`GET ${PATH}/:id`, () => {
    it("should return a single resource", done => {
      chai
        .request(server)
        .get(`${PATH}/1`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.data.length).to.equal(1);
          expect(res.body.data[0]).to.have.property("barcode");
          done();
        });
    });

    it("should return an error when the requested resource doesn't exist", done => {
      chai
        .request(server)
        .get(`${PATH}/999`)
        .end((err, res) => {
          expect(err).to.exist;
          expect(res.status).to.equal(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.error).to.equal("The requested resource does not exist");
          done();
        });
    });
  });

  describe(`POST ${PATH}`, () => {
    it("should create and return a single resource", done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send({
          barcode: '0299418',
          name: 'Frozen Peas'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.data.length).to.equal(1);
          expect(res.body.data[0]).to.have.property("barcode");
          done();
        });
    });

    it("should return an error a required parameter is missing", done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send({
          barcode: '23420121'
        })
        .end((err, res) => {
          expect(err).to.exist;
          expect(res.status).to.equal(400);
          expect(res.type).to.equal("application/json");
          // TODO Check the error message.
          // expect(res.body.error).to.equal("Missing a required parameter");
          done();
        });
    });
  });
/** every subsequent test must be added here !! **/
});
