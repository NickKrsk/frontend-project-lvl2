#!/usr/bin/env node

import program from 'commander';
import compareFiles from '..';

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-t --type <type>', 'type of file (json, yml, ini)')
  .option('-f --format <type>', 'output format (txt, plain, json)')
  .arguments('<path1> <path2>')
  .action((path1, path2) => {
    console.log(`${path1} ${path2}`);
    if (program.format) console.log(`format: ${program.format}`);
    const result = compareFiles(path1, path2, program.type, program.format);
    console.log(result);
  });
program.parse(process.argv);
