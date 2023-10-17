import axios from 'axios';
import { useCallback, useState } from 'react';

export const useUnsplash = () => {
	const [loading, setLoading] = useState(false);
	const [process, setProcess] = useState('waiting');
	const __apiKey = 'ryhIYmsQ0dsktKFIWY4eRJAi5bgHfngUi_pq2viDlxI';


	interface result {
		urls: string,
		id: number | string
	}

	const request = useCallback(async (searchTitle:string, num = 8) => {
		setLoading(true);
		setProcess('loading');
		const pageNumber = Math.floor(Math.random() * (5 - 1) + 1);
		try {
			const res = await axios.get(
				`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=${num}&orientation=landscape&query=${searchTitle}&client_id=${__apiKey}`
			);
			if (res.status === 200) {
				setLoading(false);
				setProcess('success');
				return res.data.results.map(({ urls, id }:result) => ({ id, urls }));
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setProcess('error');
		}
	}, []);

	return { request, loading, process };
};
