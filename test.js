const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);


describe('/GET post with parameters id and title', function(){
    it('it should GET one post', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1&title=qui%20est%20esse')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.json
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('it check required fields and their types in post', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1&title=qui%20est%20esse')
            .end((err, res) => {
                res.should.have.status(200);
                //do not output all posts but please make output of few first posts of the received array
                res.body.should.be.a('array');
                res.body[0].should.be.have.keys(['id', 'userId', 'title', 'body']);
                res.body[0].should.have.property('id').and.to.be.a('number');
                res.body[0].should.have.property('userId').and.to.be.a('number')
                res.body[0].should.have.property('title').and.to.be.a('string');
                res.body[0].should.have.property('body').and.to.be.a('string');
                done();
            });
    });

    it('it checks that the property values are not empty in the post', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1&title=qui%20est%20esse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].id.should.be.with.above(0);
                res.body[0].userId.should.be.above(0);
                res.body[0].title.should.be.with.length.above(0);
                res.body[0].body.should.be.with.length.above(0);
                done();
            });
    });

    it('it should GET an empty array when given non-existent userId and title values', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=TEST&title=TEST')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.should.have.json
                res.body.length.should.be.eql(0);
                done();
            });
    });

});
