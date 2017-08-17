var Rating = require('../models/Rating');
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
* GET /rating
*/

exports.ratingGet = function(req, res) {
  if (!(req.isAuthenticated())) {
    return res.status(401).send({ msg: 'You\'re required to be logged in to use this feature' });
  }
  req.assert('race', 'Race cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  Rating.findOne({ race: req.query.race, user: req.user}, function(err, rating) {
    if (rating) {
      return res.send({ hasVoted: true, rating});
    }
    return res.send({hasVoted: false});
  });
};

/**
* POST /rating
*/
exports.ratingPost = function(req, res) {
  if (!(req.isAuthenticated())) {
    return res.status(401).send({ msg: 'You\'re required to be logged in to use this feature' });
  }
  req.assert('rate', 'Rate cannot be blank').notEmpty().isInt();
  req.assert('race', 'Race cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  if (req.body.rate < 0 || req.body.rate > 10) {
    return res.status(400).send({ msg: 'Your rating must be between 0 and 10.'});
  }
  Rating.findOne({ race: req.body.race, user: req.user }, function(err, rating) {
    if (rating) {
      return res.status(400).send({ msg: 'You already voted'});
    }
    Race.findById(req.body.race, function (err, race) {
      if (!race) {
        return res.status(400).send({ msg: 'This race does not exist'});
      }
      rating = new Rating({
        rate: req.body.rate,
        race: req.body.race,
        user: req.user,
      });
      if (!race.vote_number) {
        race.vote_number = 1;
      }
      else {
        race.vote_number = race.vote_number + 1;
      }

      race.rating = (race.rating * (race.vote_number - 1) + rating.rate) / race.vote_number;
      rating.save(function(err) {
        if (!err) {
          race.save(function(err) {
            if (!err) {
              res.send({ msg: 'Thanks for voting', rating: rating});
            }
            else
            res.status(400).send({msg: err});
          });
        }
        else {
          return res.status(400).send({ msg: 'An error occurend while voting. Please try again later'});
        }
      });
    });
  });
};
