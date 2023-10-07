import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render CurrencyForm', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('Should run action with proper data on form submit', () => {
    const action = jest.fn();
    render(<CurrencyForm action={action} />);
    const submitButton = screen.getByText('Convert');
    userEvent.click(submitButton);

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('should call with expected values', () => {

    const testCases = [
      { amount: '100' , from: 'PLN', to: 'USD' },
      { amount: '20'  , from: 'USD', to: 'PLN' },
      { amount: '200' , from: 'PLN', to: 'USD' },
      { amount: '345' , from: 'USD', to: 'PLN' },
    ];

    testCases.map(testCase => {

      const action = jest.fn();
      render( <CurrencyForm action={action} /> );
      const amountElement = screen.queryByTestId('amount');
      const fromElement = screen.queryByTestId('from');
      const toElement = screen.queryByTestId('to');
      const submitButton = screen.getByText('Convert');

      userEvent.type(amountElement, testCase.amount);
      userEvent.selectOptions(fromElement, testCase.from);
      userEvent.selectOptions(toElement, testCase.to);

      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledWith(
        {
          amount: parseInt(testCase.amount), 
          from: testCase.from, 
          to: testCase.to
        }
      );

      cleanup();
    });
  });
});