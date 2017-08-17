var Track = require('../models/Track');

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
 * GET /track
 */

 exports.trackGet = function(req, res) {
   if (req.query.track_id) {
     Track.findOne({ _id: req.query.track_id}, function(err, track) {
       if (!track) {
         return res.status(400).send({ msg: 'This track doesn\'t exist'})
       }
       res.send(track);
     });
   }
   else {
     Track.find({}, function(err, tracks) {
       res.send(tracks);
     });
   }
 };

/**
 * POST /track
 */
exports.trackPost = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('location', 'Location cannot be blank').notEmpty();
  req.assert('length', 'Length cannot be null').notEmpty().isDecimal();
  req.assert('turn', 'Turn cannot be ').notEmpty().isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Track.findOne({ name: req.body.name }, function(err, track) {
    if (track) {
      return res.status(400).send({ msg: 'This track already exists.' });
    }
    track = new Track({
      name: req.body.name,
      location: req.body.location,
      length: req.body.length,
      turns: req.body.turn
    });
    track.save(function(err) {
    res.send({ msg: 'Track successfully added.', track: track});
    });
  });
};
