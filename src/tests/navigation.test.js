import { h } from 'preact';
import Navigation from '../components/navigation';
import { Link } from 'preact-router/match';
// See: https://github.com/mzgoddard/preact-render-spy
import { deep } from 'preact-render-spy';

const context = deep(<Navigation />);
describe('Initial Test of the Navigation', () => {
	test('Navigation renders 2 links', () => {
		expect(context.find(<Link />).length).toBe(2);
	});
});