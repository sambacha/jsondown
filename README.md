# JSON Down

[![Build Status](https://travis-ci.org/GarthDB/jsondown.svg?branch=master)](https://travis-ci.org/GarthDB/jsondown) [![Coverage Status](https://coveralls.io/repos/github/GarthDB/jsondown/badge.svg?branch=master)](https://coveralls.io/github/GarthDB/jsondown?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/garthdb/jsondown/badge.svg)](https://snyk.io/test/github/garthdb/jsondown)

This is a drop-in replacement for [LevelDOWN][] that writes to
a JSON file on disk.

It also retains the contents of the entire JSON file in memory, so
it's only really useful for debugging purposes and/or very small
data stores that need just a pinch of persistence.

## Example

```js
const levelup = require("levelup");
const jsondown = require("jsondown");

const db = levelup(new jsondown("./mydata.json"));

db.put("foo", "bar");
```
