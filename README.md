Identifiers
===========

Generates unlimited, sequencial, unique string identifiers.

This module makes it easy to keep track of things that need to be kept track of by some sort of unique identifier.  It ensures that the identifiers generated will be unique and as small as possible with a reasonably limitless supply.

Identifiers are generated from a set of characters (by default: letters and numbers).  Each next identifier is simply the next character in the sequence.  After all single character identifiers have been exhausted, two character identifiers are used.  Then three, then four, etc.

## Usage

```js
var Identifiers = require('Identifiers'),
	identifiers = new Identifiers();

for (var i = 0; i < 5; i++)
	console.log(identifiers.next());

// logs:
//     a
//     b
//     c
//     d
//     e
```

## Random Prefix

If identifiers should be difficult to guess, a random prefix can be added to each identifier by passing in a number specifying the length of the prefix when creating the identifiers instance.

```js
var Identifiers = require('Identifiers'),
	identifiers = new Identifiers(4);

for (var i = 0; i < 5; i++)
	console.log(identifiers.next());

// example output:
//     bscCa
//     cau5b
//     zavAc
//     x5qyd
//     UyTpe
```

## Custom Character Set

A custom character set can be specified as the second argument when creating the identifiers instance.

```js
var Identifiers = require('Identifiers'),
	identifiers = new Identifiers(1, 'abc');

for (var i = 0; i < 5; i++)
	console.log(identifiers.next());

// example output:
//     ca
//     ab
//     cc
//     aaa
//     cab
```
