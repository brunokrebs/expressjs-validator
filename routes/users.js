const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();

router.post('/', [
    check('firstName', 'First name must have more than 2 characters').exists().isLength({min: 2}),
    check('lastName', 'Last name must have more than 2 characters').exists().isLength({min: 2}),
    check('classYear', 'Class Year should be a number').exists().isInt(),
    check('email', 'Your email is not valid').exists().isEmail(),
    check('phoneNumber', 'Your phone number must be at least 8 digits').exists().isLength({min: 8}),
    check('password', 'Your password must be at least 5 characters').exists().isLength({min: 5}),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
    check('isAdmin').optional().isIn(['on', 'off'])
  ],
  function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.send({});
    }
  });

module.exports = router;
