const {defaults} = require('jest-config');
module.exports = {
    "transform": {
	"^.+\\.jsx?$": "babel-jest"
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
