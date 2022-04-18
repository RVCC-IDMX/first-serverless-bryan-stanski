const chalk = require('chalk');
const { DateTime } = require('luxon');

// mod.cjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async function (event, context) {
  const date = DateTime.now();

  const eventBody = JSON.parse(event.body);

  console.log(chalk.bgMagenta(`${date}`));
  console.log(chalk.bgMagenta(`\teventBody.region: ${eventBody.region}`));

  const POKE_API = 'https://pokeapi.co/api/v2/pokedex/' + eventBody.region;

  const response = await fetch(POKE_API);
  const data = await response.json();

  console.log(
    chalk.bgMagenta(`\tNumber of entries: ${data.pokemon_entries.length}`)
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ pokemon: data.pokemon_entries }),
  };
};
