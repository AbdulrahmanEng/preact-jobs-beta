import { h } from 'preact';
import Header from '../components/header';
import Navigation from '../components/navigation';
// See: https://github.com/mzgoddard/preact-render-spy
import { deep } from 'preact-render-spy';

const context = deep(<Header />);
describe('Initial Test of the Header', () => {
    test('Header renders Navigation', () => {
        expect(context.contains(Navigation));
    });
});