var Race = require('../models/Race');

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

/**
 * Admin required middleware
 */

 exports.ensureAdmin = function(req, res, next) {
   if (req.isAuthenticated()) {
     if (req.user.isAdmin) {
       next();
     }
     else {
       res.status(401).send({ msg: 'You don\'t have the right to use this feature. Please make sure your account has the correct rights'});
     }
   } else {
     res.status(401).send({ msg: 'You\'re required to be logged in to use this feature' });
   }
 };

 /**
 * GET /race
 */
 exports.raceGet = function(req, res) {
   if (req.query.name && req.query.year) {
     Race.findOne({ name: req.query.name, year: req.query.year}, function(err, race) {
       if (!race) {
         return res.status(400).send({ msg: 'This race doesn\'t exist'})
       }
       res.send(race);
     });
   }
   else {
     Race.find({}, function(err, races) {
       res.send(races);
     });
   }
 };

 /**
  * POST /race
  */
 exports.racePost = function(req, res) {
   req.assert('name', 'Name cannot be blank').notEmpty();
   req.assert('track', 'Track cannot be null').notEmpty();
   req.assert('year', 'Length cannot be null').notEmpty().isInt();

   var errors = req.validationErrors();

   if (errors) {
     return res.status(400).send(errors);
   }

   Race.findOne({ name: req.body.name }, function(err, race) {
     if (race) {
       return res.status(400).send({ msg: 'This race already exists.' });
     }
     race = new Race({
       name: req.body.name,
       rating: 0,
       vote_number: 0,
       year: req.body.year,
       track: req.body.track,
       video_url_id: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + req.body.video_url_id + "\" frameborder=\"0\" allowfullscreen></iframe>",
       thumbnail_url: "https://img.youtube.com/vi/" + req.body.video_url_id + "/maxresdefault.jpg"
     });
     race.save(function(err) {
        res.send({ msg: 'Race successfully added.', race: race});
     });
   });
 };
