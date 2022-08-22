const router = require("express").Router();
const axios = require("axios");

const ApiService = require("../services/api.service");
const apiService = new ApiService();

/* GET home page */
router.get("/characters", (req, res, next) => {
	apiService
		.getAllCharacters()
		.then((response) => {
			// console.log(responseFromAPI)
			res.render("characters/list-characters", {
				characters: response.data,
			});
		})
		.catch((err) => console.error(err));
});

// get details page
router.get("/characters/:id", (req, res, next) => {
	apiService
		.getOneCharacter(req.params.id)
		.then((response) => {
			console.log(response.data);
			// console.log("details: ", responseFromAPI.data)
			res.render("characters/details-character", {
				character: response.data,
			});
		})
		.catch((err) => console.error(err));
});

// get character form
router.get("/character/create", (req, res, next) => {
	res.render("characters/create-character");
});

// create character
router.post("/character/create", (req, res, next) => {
	const { name, occupation, weapon } = req.body;
	apiService
		.createCharacter({
			name,
			occupation,
			weapon,
		})
		.then(() => res.redirect("/characters"))
		.catch((err) => console.log(err));
});

// get edit form
router.get("/character/:id/edit", (req, res, next) => {
	const charId = req.params.id;

	apiService
		.getOneCharacter(charId)
		.then((character) => {
			console.log(character.data);
			res.render("characters/edit-character", character.data);
		})
		.catch((err) => console.log(err));
});

// post edit form
router.post("/character/:id/edit", (req, res, next) => {
	const charId = req.params.id;
	const { name, occupation, weapon } = req.body;

	apiService
		.editCharacter(charId, { name, occupation, weapon })
		.then(() => res.redirect(`/characters/${charId}`))
		.catch((err) => console.log(err));
});

// delete character
router.post("/character/:id/delete", (req, res, next) => {
	const charId = req.params.id;

	apiService
		.deleteCharacter(charId)
		.then(() => {
			res.redirect("/characters");
		})
		.catch((err) => console.log(err));
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
