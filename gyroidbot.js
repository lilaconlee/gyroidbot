const _ = require('lodash');
const chalk = require('chalk');

import './main.scss';

const words = require('./words/manywords.json').words;
// TODO: make squat, wee, slim less likely
const prefixes = [
  '',
  'mini ',
  'mega ',
  'tall ',
  'squat ',
  'wee ',
  'slim '
];

const getGyr = () => _.sample(prefixes) + _.sample(words);
const getGyroid = () => `${getGyr()}oid`; 

const print = () => {
	while (true) {
		console.log(`Look! I dug up a ${chalk.blue(getGyr() + 'oid')}!`);
	}
}

document.querySelector('span.blue').textContent = getGyroid();
