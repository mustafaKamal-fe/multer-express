import { Container } from '@material-ui/core';
import UploadOperation from './components/Upload';
import Distros from './components/Distros';
import UploadAndSave from './components/UploadAndSave';

function App() {
	return (
		<Container>
			<UploadOperation url='files/single' />
			<UploadOperation url='files/many' options={{ single: false }} />
			<UploadAndSave url='files/save' />
			<UploadAndSave url='files/savemany' options={{ single: false }} />

			<Distros url='files/diffmany' />
			<footer>
				<a href='https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects'>
					<h3>The Best Guide to know about form data and sending files...</h3>
				</a>
			</footer>
		</Container>
	);
}

export default App;
