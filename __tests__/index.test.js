import { compareData } from '../src';

test('compareFiles', () => {
  const dataBefore = `{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }`;
  const dataAfter = `{
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  }`;

  const resultObj = JSON.parse(compareData(dataAfter, dataBefore));
  const result = JSON.parse('{"- timeout":20,"+ timeout":50,"- verbose":true,"host":"hexlet.io","+ proxy":"123.234.53.22","+ follow":false}');

  expect(resultObj).toEqual(result);
});
