import { Button, Divider, Input, Typography } from '@material-ui/core';
import { useState } from 'react';

/**
 *
 * Send single file
 */
export default function UploadOperation({ url, options = { single: true } }) {
	const { single } = options;
	const [file, setFile] = useState(null);
	const [files, setFiles] = useState([]);

	const handleSubmitSingle = async () => {
		const form = new FormData();
		form.append('image', file);

		await fetch(`http://localhost:3001/${url}`, {
			method: 'POST',
			body: form,
		});
	};
	if (single) {
		const handleChangeSingle = (e) => {
			setFile(e.target.files[0]);
		};

		return (
			<div>
				<Typography variant='h4'>Upload Single File</Typography>
				<h5>
					Uploaded File: <h6>{file && file.name}</h6>
				</h5>
				<form>
					<div>
						<Input disableUnderline type='file' onChange={handleChangeSingle} />
					</div>
					<Button variant='contained' onClick={handleSubmitSingle}>
						Send
					</Button>
				</form>
				<Divider />
			</div>
		);
	} else {
		const handleChangeMultiple = (e) => {
			let newState = [...files];
			newState.push(...e.target.files);
			setFiles(newState);
		};

		const handleSubmitMultiple = async () => {
			const form = new FormData();

			files.forEach((file) => {
				form.append('images', file);
			});

			// Wrong !!
			// for (let i = 0; i < files.length; i++) {
			// 	console.log(files[i].originFileObj);
			// }
			// Wrong !!
			// for (let i = 0; i < files.length; i++) {
			// 	form.append(`images[${i}]`, files[i]);
			// }

			await fetch(`http://localhost:3001/${url}`, {
				method: 'POST',
				body: form,
			});
		};
		return (
			<div>
				<Typography variant='h4'>Upload Multiple Files</Typography>
				<h5>
					Uploaded Files:
					<h6>
						{files &&
							files.map((e, i) => {
								return (
									<div
										style={{
											border: '1px solid',
											padding: '1rem',
											textAlign: 'center',
										}}
										key={i}>
										{e.name}
									</div>
								);
							})}
					</h6>
				</h5>
				<form>
					<div>
						<Input
							disableUnderline
							type='file'
							inputProps={{ multiple: true }}
							onChange={handleChangeMultiple}
						/>
					</div>
					<Button variant='contained' onClick={handleSubmitMultiple}>
						Send
					</Button>
				</form>
				<Divider />
			</div>
		);
	}
}
