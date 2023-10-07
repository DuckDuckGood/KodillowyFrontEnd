export const convertPLNToUSD = (PLN) => {

  if (parseInt(PLN) !== 0 && (!PLN || !isFinite(PLN) || parseInt(PLN) < 0)) {
    return NaN;
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}