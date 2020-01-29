#!/usr/bin/env node

import program from 'commander';

//const program = new commander.Command();

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f --format <type>', 'output format');

/*program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');*/

program.parse(process.argv);

if (program.format) console.log(`- ${program.format}`);

/*
if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
*/
  console.log('hello');