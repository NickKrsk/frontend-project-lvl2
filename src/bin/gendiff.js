#!/usr/bin/env node

import program from 'commander';

//const program = new commander.Command();

program.version('0.0.1');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

  console.log('hello');