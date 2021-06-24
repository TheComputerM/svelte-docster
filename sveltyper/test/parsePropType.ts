import { test } from 'uvu';
import { equal } from 'uvu/assert';
import parsePropType from '../src/parsePropType';

test('number', () => {
  equal(
    parsePropType({
      value: '2',
      tags: [],
    }),
    'number',
  );
});

test('string', () => {
  equal(
    parsePropType({
      value: "'value'",
      tags: [],
    }),
    'string',
  );

  equal(
    parsePropType({
      value: '"value"',
      tags: [],
    }),
    'string',
  );
});

test('string literals', () => {
  equal(
    parsePropType({
      value: '`hello world`',
      tags: [],
    }),
    'string',
  );
});

test('object', () => {
  equal(
    parsePropType({
      value: '{a: 1, b: 2}',
      tags: [],
    }),
    'object',
  );

  equal(
    parsePropType({
      value: '[1,2,3,4]',
      tags: [],
    }),
    'array',
  );
});

test.run();
