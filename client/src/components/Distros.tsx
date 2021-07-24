import { useState } from 'react';
import { Container, Button } from '@material-ui/core';
/**
 * Send diff files frm diff inputs
 */
export default function Distros({ url }) {
	const [sOne, setSOne] = useState([]);
	const [sTwo, setSTwo] = useState([]);

	const handleSourceOne = (e) => {
		let newState = [...sOne];
		newState.push(...e.target.files);
		setSOne(newState);
	};

	const handleSourceTwo = (e) => {
		let newState = [...sTwo];
		newState.push(...e.target.files);
		setSTwo(newState);
	};
	const handleSubmit = async () => {
		let form = new FormData();

		sOne.forEach((file) => {
			form.append('gOne', file);
		});

		sTwo.forEach((file) => {
			form.append('gTwo', file);
		});

		const api =
			process.env.NODE_ENV === 'development'
				? `${process.env.DEV_API}${url}`
				: `${url}`;

		await fetch(api, {
			method: 'POST',
			body: form,
		});
	};

	return (
		<Container>
			<h1>upload from different inputs</h1>

			<form>
				<h5>source 1</h5>
				<input
					type='file'
					multiple
					name='source-one'
					onChange={handleSourceOne}
				/>
				{sOne &&
					sOne.map((e, i) => {
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
				<br />

				<h5>source 2</h5>
				<input
					type='file'
					multiple
					name='source-two'
					onChange={handleSourceTwo}
				/>

				{sTwo &&
					sTwo.map((e, i) => {
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

				<Button variant='contained' onClick={handleSubmit}>
					Send
				</Button>
			</form>
		</Container>
	);
}
