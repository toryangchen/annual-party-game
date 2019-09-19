import axios from 'axios';

export default axios.create({
	baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
	timeout: 2000,
	header: {

	}
});