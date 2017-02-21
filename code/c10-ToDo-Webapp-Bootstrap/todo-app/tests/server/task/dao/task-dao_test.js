"use strict";

const mongoose = require('mongoose');
const taskDAO = require(process.cwd() + '/server/api/task/dao/task-dao');
const expect = require('chai').expect;
const setupMongoose = require('../../_helpers/db').setupMongoose;

describe('taskDAO', () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach(() => {
    taskDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
