const request = require('supertest'); // import supertest 
const { expect } = require('chai'); // import chai 
const base_url = require('../global_variable/base_url'); // import global variable
const fs = require('fs').promises 
const path = require('path');

const url = `${base_url}`; // define global variable 

async function getMethod(){
    const response = await request(url).get('api/users/2');
    //assertion 
    expect(response.status).to.equal(200); 
    expect(response.body.first_name).to.equal('Janet');
    expect(response.body.id).to.equal('2');
}

async function getPostRegisterSuccess(){
    const payloadPath = path.join(__dirname, 'payload', 'register_successful.json');
    const payloadData = await fs.readFile(payloadPath, 'utf-8');
    // convert JSON to JS object
    const payload = JSON.parse(payloadData);

    const response = await request(url).post('api/register').send(payload);
    // assertion
    expect(response.status).to.equal(200);
    expect(response.body.email).to.be.a('string'); 
    expect(response.body.password).to.be.a('string');
    expect(response.body.email).to.not.be.null;
    expect(response.body.password).to.not.be.null;
}

async function getPostRegisterUnsuccess(){
    const payloadPath = path.join(__dirname, 'payload', 'register_unsuccessful.json');
    const payloadData = await fs.readFile(payloadPath, 'utf-8');
    const payload = JSON.parse(payloadData);

    const response = await request(url).post('api/register').send(payload);
    // assertion 
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.email).to.be.a('string');
}

async function getPostLoginSucces(){
    const payloadPath = path.join(__dirname, 'payload', 'login_successful.json');
    const payloadData = await fs.readFile(payloadPath, 'utf-8');
    const payload = JSON.parse(payloadData);

    const response = await request(url).post('api/login').send(payload);
    // assertion 
    expect(response.status).to.equal(200); 
    expect(response.body.email).to.equal('eve.holt@reqres.in');
    expect(response.body.password).to.equal('cityslicka');
    expect(response.body.password).to.not.be.null;
    expect(response.body.email).to.not.be.null;
}

async function getPostLoginUnsuccess(){
    const payloadPath = path.join(__dirname, 'payload', 'login_unsuccessful.json');
    const payloadData = await fs.readFile(payloadPath, 'utf-8');
    const payload = JSON.parse(payloadData);

    const response = await request(url).post('api/login').send(payload);
    // assertion
    expect(response.status).to.equal(400);
    expect(response.body.email).to.not.be.null;
    expect(response.body.password).to.be.null;
}

async function getDelete(id){
    const response = await request(url).delete(`api/users/${id}`)
    // assertion
    expect(response.status).to.equal(204);
    expect(response.body.console.error(`Object with id = ${id} was not found!`))
}
module.exports = {getMethod, getPostRegisterSuccess, getPostRegisterUnsuccess, getPostLoginSucces, getPostLoginUnsuccess, getDelete};