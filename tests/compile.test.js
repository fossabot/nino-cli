const { compile } = require('../dist/compile');
const fs = require('fs-extra');
const { joinWithRootPath } = require('../dist/utils/common');

describe('nino compile', () => {
  beforeAll(() => {
    jest.resetModules();
    jest.setTimeout(30000);
  });

  afterAll(() => {
    jest.setTimeout(5000);
  });

  outputDirPaths = ['lib', 'es'];
  outputFilePaths = [
    'ts/assets/case-1',
    'ts/assets/case-2',
    'ts/case-3',
    'ts/src/calc.js',
    'ts/src/assets/case-4',
    'ts/src/assets/case-5',
    'ts/src/modules/add/index.js',
    'ts/src/modules/add/css.css',
    'tsx/assets/case-1',
    'tsx/assets/case-2',
    'tsx/case-3-tsx',
    'tsx/index-tsx.js',
    'tsx/src/calc-tsx.js',
    'tsx/src/modules/add/index-tsx.js',
    'tsx/src/modules/add/css-tsx.css',
    'tsx/src/assets/case-4',
    'tsx/src/assets/case-5',
  ];

  getContent = paths => fs.readFileSync(joinWithRootPath(paths)).toString();

  it('compile correctly', done => {
    compile(
      {
        entry: 'tests/cases/compile',
      },
      () => {
        for (const dir of outputDirPaths) {
          for (const file of outputFilePaths) {
            expect(getContent([dir, file])).toMatchSnapshot();
          }
        }
        done();
      },
    );
  });
});
