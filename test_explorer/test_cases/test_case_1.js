// import package 
const request = require('supertest'); // import supertest
const { expect } = require('chai'); // import chai
const base_url = require('../global_variable/base_url'); // import global variable
const { getMethod, getPostRegisterSuccess, getPostRegisterUnsuccess, getPostLoginSucces, getPostLoginUnsuccess, getDelete } = require('../api_server/api_objects');

const url = `${base_url}`; // define global variable

// test suite 
describe('Test GET:', function(){
    // test case 1 (GET: ALL USERS)
    it('Test GET', async function(){
        const response = await request(url).get('api/users?page=2');
        // assertion 
        expect(response.status).to.equal(200); // success status 
        expect(response.body).to.have.property('data').to.be.an('array'); // check if data property is an array form.
        expect(response.body.data.length).to.be.greaterThan(0); // check if data exists.
        expect(response.body.data.some(obj => obj.id === 7)).to.be.true; // check if id = 7 exists
    });

    // test case 2 (GET: SINGLE USER)
    it('Test GET (SINGLE USER)', async function(){
        const response = await request(url).get('api/users/2');
        getMethod();
        console.log(response.body);
    });
});

describe('Test POST:', function(){
    // test case 3 (POST)
    it('Test POST', async function(){
        const response = await request(url).post('api/users').send({
            name: "morpheus",
            job: "leader"
        });
        // assertion 
        expect(response.status).to.equal(201); 
        expect(response.body.name).to.equal('morpheus');
        expect(response.body.job).to.equal('leader');
        console.log(response.body);
    });

    // test case 4 (POST: REGISTER - SUCCESSFUL)
    it('Test POST (REGISTER - SUCCESSFUL)', async function(){
        const response = await request(url).get('api/register');
        getPostRegisterSuccess();
    });

    // test case 5 (POST: REGISTER - UNSUCCESSFUL)
    it('Test POST (REGISTER - UNSUCCESSFUL)', async function(){
        const response = await request(url).get('api/register');
        getPostRegisterUnsuccess();
    })

    // test case 6 (POST: LOGIN - SUCCESSFUL)
    it('Test POST (LOGIN - SUCCESSFUL)', async function(){
        const response = await request(url).get('api/login');
        getPostLoginSucces();
    })

    // test case 7 (POST: LOGIN - UNSUCCESSFUL)
    it('Test POST (LOGIN - UNSUCCESSFUL)', async function(){
        const response = await request(url).get('api/login');
        getPostLoginUnsuccess();
    })
});

describe('Test DELETE:', function(){
    // test case 8 (DELETE)
    it('Test DELETE', async function(){
        getDelete('2'); // user with id = 2
    })
});