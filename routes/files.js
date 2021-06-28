var express = require('express');
var router = express.Router();
const multer = require('multer');

const singleFile = multer().single('image');
const multipleFiles = multer().array('images', 3);
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '_' + Date.now());
	},
});
const saveSingleFile = multer({ storage }).single('image');

const saveMultipleFiles = multer({ storage }).array('images');

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Math.random());
// 	},
// });

// POST single file
router.post('/single', function (req, res) {
	singleFile(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			next(err);
		} else if (err) {
			// An unknown error occurred when uploading.
			next(err);
		}

		// Everything went fine.
		if (req.file) {
			res.json({
				message: `image file [${req.file.originalname}] Was received successfuly`,
			});
			res.end();
		}
	});
});

// POST many files
router.post('/many', function (req, res) {
	multipleFiles(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log('Multer:', err);
			next(err);
		} else if (err) {
			// An unknown error occurred when uploading.
			console.log('SMTElse:', err);
			next(err);
		}

		// Everything went fine.
		if (req.files) {
			console.log(req.files);
			res.json({ message: `${req.files.length} Were received successfuly` });
		}
	});
});

// POST Single and save to fs
router.post('/save', function (req, res) {
	saveSingleFile(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log('Multer:', err);
			next(err);
		} else if (err) {
			// An unknown error occurred when uploading.
			console.log('SMTElse:', err);
			next(err);
		}

		// Everything went fine.
		if (req.files) {
			console.log(req.files);
			res.json({ message: `${req.files.length} Were received successfuly` });
		}
	});
});

module.exports = router;
