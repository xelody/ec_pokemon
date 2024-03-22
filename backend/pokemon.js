const express = require('express');
const router = express.Router();

const pokemonColors = [
    { name: "pikachu", color: "yellow" },
    { name: "charizard", color: "red" },
];

router.delete('/:pkId', function (req, res) {
    const pokemonName = req.params.pkId;

    for (let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if (pokemonRow.name === pokemonName) {
            pokemonColors.splice(i, 1);
            return res.send('Pokemon ' + pokemonName + ' was successfully removed');
        }
    }

    res.status(404);
    return res.send('Pokemon with name ' + pokemonName + ' not found :(');
});

router.put('/:pkId', function (req, res) {
    const pokemonName = req.params.pkId;
    const newColor = req.body.color;

    for (let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if (pokemonRow.name === pokemonName) {
            pokemonRow.color = newColor;
            return res.send('The color of Pokemon '
                + pokemonName + ' was successfully updated to ' + newColor);
        }
    }

    res.status(404);
    return res.send('Pokemon with name ' + pokemonName + ' not found :(');
});

router.post('/', function (req, res) {
    const requestBody = req.body;

    const newPokemon = {
        name: requestBody.name,
        color: requestBody.color,
    }

    pokemonColors.push(newPokemon);

    res.send("Pokemon " + requestBody.name + "successfully added!")
})

// -> /pokemon/pikachu => req.params.pokemonName === pikachu
// -> /pokemon/pikachu?food=banana
router.get('/:pkId', function (req, res) {
    const pokemonName = req.params.pkId;
    // const trainer = req.params.trainer;

    for (let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if (pokemonRow.name === pokemonName) {
            return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
        }
    }

    res.status(404);
    return res.send("Pokemon with name " + pokemonName + " not found :(");
})

router.get('/', function (req, res) {
    const pokemonName = req.query.name
    console.log(req.query);

    for (let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if (pokemonRow.name === pokemonName) {
            return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
        }
    }

    return res.send("Hello, I'm pikachu");
})

router.post('/', function (req, res) {
    res.send("Hello, I'm pikachu in the POST request");
})

module.exports = router;