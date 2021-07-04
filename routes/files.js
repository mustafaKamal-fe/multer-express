var express = require('express');
var router = express.Router();

// multer
const multer = require('multer');
// storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '_' + Date.now());
	},
});

const getSingleFile = multer().single('image');
const getMultipleFiles = multer().array('images', 3);
const saveSingleFile = multer({ storage }).single('image');
const saveMultipleFiles = multer({ storage }).array('images');
const getManyDiff = multer().fields([
	{ name: 'gOne', maxCount: 12 },
	{ name: 'gTwo', maxCount: 12 },
]);
// POST single file
router.post('/single', function (req, res) {
	getSingleFile(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			next(err);
		} else if (err) {
			// An unknown error occurred when uploading.
			next(err);
		}

		// Everything went fine.
		if (req.file) {
			console.log('Single File Upload, No Saving');
			console.log(req.file);
			res.json({
				message: `image file [${req.file.originalname}] Was received successfuly`,
			});
			res.end();
		}
	});
});

// POST many files
router.post('/many', function (req, res) {
	getMultipleFiles(req, res, function (err) {
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
			console.log('Many Files Upload, No Saving');
			console.log(req.files);
			res.json({ message: `${req.files.length} Were received successfuly` });
		}
	});
});

// POST Single and save to fs
router.post('/save', function (req, res) {
	console.log('Save Single To fs');
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
		if (req.file) {
			console.log('File Was Saved To fs');
			console.log(req.file);
			res.status(201);
		}
	});
});

// POST many and save to fs
router.post('/savemany', function (req, res) {
	saveMultipleFiles(req, res, function (err) {
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
			console.log('Files Were saved to fs');
			console.log(req.files);
			res.json({ message: `${req.files.length} Were received successfuly` });
		}
	});
});

// POST many files from diff sources within the same form inside UI
router.post('/diffmany', function (req, res) {
	getManyDiff(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log('Multer:', err);
			next(err);
		} else if (err) {
			// An unknown error occurred when uploading.
			console.log('Some Other Error:', err);
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
