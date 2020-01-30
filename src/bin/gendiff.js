#!/usr/bin/env node

import program from 'commander';
import compareFiles from '../';

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f --format <type>', 'output format')
  .arguments('<path1> <path2>')
  .action(function (path1, path2) {
    console.log(`${path1} ${path2}`)
    compareFiles(path1, path2);
  });

program.parse(process.argv);

//if (program.format) console.log(`- ${program.format}`);

  console.log('hello');