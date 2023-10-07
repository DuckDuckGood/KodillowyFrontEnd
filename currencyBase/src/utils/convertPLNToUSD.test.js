import { convertPLNToUSD } from "./convertPLNToUSD";

describe('ConvertPLNToUSD', () => {
  it('Should return proper value when good input', () => {
    expect(convertPLNToUSD(0)).toBe('$0.00');
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('Should return NaN when provided text', () => {
    expect(convertPLNToUSD('jeden')).toBeNaN();
  });

  it('Should return NaN when no param', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  
  it('Should return NaN when value less than zero', () => {
    expect(convertPLNToUSD(-1)).toBeNaN();
  });
});