import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ResultBox Component', () => {

  afterEach(cleanup);

  it('should render without crashing', () => {
    render( <ResultBox from='PLN' to='USD' amount={100} /> );
  });

  it('shoud render result from=PLN and to=USD and amount=100', () => {
    render( <ResultBox from='PLN' to='USD' amount={100} data-testid='ResultBox-test' /> );

    const result = screen.getByTestId('ResultBox-test');

    expect(result).toHaveTextContent('PLN 100.00 = $28.57');
  });

  it('shoud render result from=PLN and to=USD and amount=200', () => {
    render( <ResultBox from='PLN' to='USD' amount={200} data-testid='ResultBox-test' /> );

    const result = screen.getByTestId('ResultBox-test');

    expect(result).toHaveTextContent('PLN 200.00 = $57.14');
  });

  it('shoud render result from=USD and to=PLN and amount=100', () => {
    render( <ResultBox from='USD' to='PLN' amount={100} data-testid='ResultBox-test' /> );

    const result = screen.getByTestId('ResultBox-test');

    expect(result).toHaveTextContent('$100.00 = PLN 350.00');
  });
  
  it('shoud render result from=PLN and to=PLN and amount=100', () => {
    render( <ResultBox from='PLN' to='PLN' amount={100} data-testid='ResultBox-test' /> );

    const result = screen.getByTestId('ResultBox-test');

    expect(result).toHaveTextContent('PLN 100.00 = PLN 100.00');
  });

  it('shoud render result from=PLN and to=USD and amount=-100', () => {
    render( <ResultBox from='PLN' to='USD' amount={-100} data-testid='ResultBox-test' /> );

    const result = screen.getByTestId('ResultBox-test');

    expect(result).toHaveTextContent('Wrong value...');
  });
});