const { describe, it, expect, beforeEach } = require('@jest/globals');

const mongoose = require('mongoose');
const connectDB = require('./');

// TODO: Add jest to eslint config
jest.mock('mongoose', () => {
  const mockedMongoose = {
    connect: jest.fn(),
    connection: {
      on: jest.fn(),
      once: jest.fn(),
    },
  };

  return mockedMongoose;
});

describe('db', () => {
  describe('connectDB', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call mongoose.connect with the correct MongoDB URI', () => {
      connectDB();
      expect(mongoose.connect).toHaveBeenCalledWith(
        'mongodb://127.0.0.1:27017/test'
      );
    });

    it('should bind to error and open events on mongoose.connection', () => {
      connectDB();
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'error',
        expect.any(Function)
      );
      expect(mongoose.connection.once).toHaveBeenCalledWith(
        'open',
        expect.any(Function)
      );
    });

    it('should log an error message when there is a connection error', () => {
      connectDB();
      const errorCallback = mongoose.connection.on.mock.calls.find(
        (call) => call[0] === 'error'
      )[1];
      errorCallback('Mock error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'MongoDB connection error:',
        'Mock error'
      );
    });

    it('should log a success message when the connection is successful', () => {
      connectDB();
      const openCallback = mongoose.connection.once.mock.calls.find(
        (call) => call[0] === 'open'
      )[1];
      openCallback();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Successfully connected to MongoDB!'
      );
    });
  });
});
