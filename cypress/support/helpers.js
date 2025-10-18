import {fa, faker} from '@faker-js/faker';

export function getRandomNumber() {
 // return new Date().getTime();
 return faker.number.bigInt();
}

export function getRandomEmail() {
  return `test-${getRandomNumber()}@gmail.com`;
 //  return faker.internet.email({firstName: 'QATesterPgats'});
 // return faker.internet.email({firstName: 'QA', lastName: 'Tester', provider: 'gmail'});
}