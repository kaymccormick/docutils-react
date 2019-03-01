const {defaults} = require('jest-config');
module.exports = {
    "transform": {
	"^.+\\.jsx?$": "babel-jest"
    },
    setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js',
};
