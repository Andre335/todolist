var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const Task = require('./task.model');
const taskServer = require('./task.server');
const app = require('../app');

let validTask = {
    "_id": "5baedf4a16ca765081d6f37f",
    "title": "Fazer Feira",
    "type": "Pessoal",
    "done": false,
    "period": new Date()
}

let invalidTask = {
    "type": "Pessoal",
    "done": false,
    "period": new Date()
}

chai.use(chaiHttp);

describe('Tests for create of /task route', () => {
    after(async () => {
        await taskServer.drop();
    });

    it('Test Create Valid Task', (done) => {
        request(app)
            .post('/task')
            .send(validTask)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('done');
                expect(res.body).to.have.property('period');
                done();
            })
            .catch(done);
    });

    it('Test Create Invalid Task', (done) => {
        request(app)
            .post('/task/')
            .send(invalidTask)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});

describe('Tests for findOne of /task route', () => {
    after(async () => {
        await taskServer.drop();
    });

    before(async () => {
        await taskServer.create(validTask);
    });

    it('Test findOne with Success', (done) => {
        request(app)
            .get('/task/5baedf4a16ca765081d6f37f')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('done');
                expect(res.body).to.have.property('period');
                done();
            })
            .catch(done);
    });

    it('Test findOne with invalid id', (done) => {
        request(app)
            .get('/task/invalidid')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test findOne with non existing task', (done) => {
        request(app)
            .get('/task/5baedf4a16ca765081d6f37e')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});

describe('Tests for findAll of /task route', () => {
    afterEach(async () => {
        try {
            await taskServer.drop();
        } catch(err) {
        }
    });

    before(async () => {
        await taskServer.create(validTask);
    });

    it('Test findAll with Tasks', (done) => {
        request(app)
            .get('/task')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('type');
                expect(res.body[0]).to.have.property('done');
                expect(res.body[0]).to.have.property('period');
                done();
            })
            .catch(done);
    });

    it('Test findAll with no Tasks', (done) => {
        request(app)
            .get('/task')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});

describe('Tests for update of /task route', () => {
    modifications = {
        "done": true
    }

    before(async () => {
        await taskServer.create(validTask);
    });

    after(async () => {
        await taskServer.drop();
    });

    it('Test update of not existing task', (done) => {
        request(app)
            .put('/task/5baedf4a16ca765081d6f37a')
            .send(modifications)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test update with invalid ID', (done) => {
        request(app)
            .put('/task/invalidid')
            .send(modifications)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test update of task', (done) => {
        request(app)
            .put('/task/5baedf4a16ca765081d6f37f')
            .send(modifications)
            .expect(202)
            .then((res) => {
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('done');
                expect(res.body.done).equals(true);
                expect(res.body).to.have.property('period');
                done();
            })
            .catch(done);
    });
});

describe('Tests for delete of /task route', () => {
    before(async () => {
        await taskServer.create(validTask);
    });

    after(async () => {
        await taskServer.drop();
    });
    
    it('Test deleteById with not existing task', (done) => {
        request(app)
            .delete('/task/5baedf4a16ca765081d6f37a')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test deleteById with not invalid ID', (done) => {
        request(app)
            .delete('/task/invalidID')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test deleteById with existing id', (done) => {
        request(app)
            .delete('/task/5baedf4a16ca765081d6f37f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});