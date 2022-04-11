# Koa / Node + MySQL + Bootstrap TODO Demo

Simple project to implement the diferents frameworks.

## Requirments

NodeJs, MySQL.

### mysql quick reference

Install:

Create Database and change values on database.js

`<username>` & `password` into [database.js](./database.js)


```sh
CREATE TABLE `todos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `done` int(11) DEFAULT '0',
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```

## Running

```sh
$ npm start
```

Open on Browser [http://localhost:3000](http://localhost:3000).
