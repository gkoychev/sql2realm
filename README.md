# sql2realm
Command line tool to convert Sql database into Realm object database 

[![Build Status](https://travis-ci.com/gkoychev/sql2realm.svg?branch=dev)](https://travis-ci.com/gkoychev/sql2realm)

## Getting Started

Install using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn global add sql2realm
```

Or via [`npm`](https://www.npmjs.com/):

```bash
npm install -g sql2realm
```

## Usage

```

Usage: sql2realm [config file]

Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  -s, --skip   skip some tables                            [array] [default: []]
  -c, --chunk  chunk size                                       [default: 10000]

```

<p align="center"><img src="./img/demo.gif?raw=true"/></p>

## Example

let say we have Mysql server up and running and have a database named `mock` with table `mock_data` (see [the dump](./integration-test/mock_data.sql))

and this is the config file `config.json` 
```
{
  "mysql": {
    "host": "127.0.0.1",
    "user": "test",
    "password": "test",
    "database": "mock"
  },

  "realm": {
    "database": "./db.realm"
  },

  "tables": {
    "mock_data": {
      "schema": {
        "name": "Users",
        "primaryKey": "id",
        "properties": {
          "id": "int",
          "first_name": "string",
          "last_name": "string",
          "email": "string",
          "gender": "string",
          "ip_address": "string"
        }
      },
    }
  }
}
```
lets discuss config file sections one by one:

### mysql connection options
```
"mysql": {...}
```
this is regular mysql/mariadb connection options

### realm db options 
```
"realm": {...}
```
for realm there is only one option:
- `database` - path to database that will be created

### Tables
this section contain tables from sql that will be converted to Realm
```
  "tables": {
    "mock_data": {
      "schema": {
```
- `mock_data` - is the real name of table in Mysql
- `schema` - is the [Realm DB Schema](https://realm.io/docs/javascript/latest#models). It should be designed according to Realm principles.

## License

MIT