import { formatCurrency, formatNumber } from './utils.js';

const initCashVsPoints = () => {
  const form = document.getElementById('calculator-form');
  const resultsSection = document.getElementById('results');
  if (!form || !resultsSection) return;

  const updateResults = () => {
    const cashPrice = parseFloat(document.getElementById('cash-price').value);
    const pointsRequired = parseInt(document.getElementById('points-required').value, 10);
    const taxesFees = parseFloat(document.getElementById('taxes-fees').value) || 0;

    const cashValueOfPoints = cashPrice - taxesFees;
    const cpp = (cashValueOfPoints / pointsRequired) * 100;
    const usePoints = cpp >= 1.6;

    resultsSection.style.display = 'block';
    document.getElementById('cash-total').textContent = formatCurrency(cashPrice);
    document.getElementById('cash-details').textContent = 'Full cash payment';

    document.getElementById('points-total').textContent = `${formatNumber(pointsRequired)} pts`;
    document.getElementById('points-details').textContent = `+ ${formatCurrency(taxesFees)} in taxes`; 

    document.getElementById('cpp-actual').textContent = `${cpp.toFixed(2)}¢`;

    const cashCard = document.getElementById('cash-result');
    const pointsCard = document.getElementById('points-result');
    cashCard.classList.remove('card--featured');
    pointsCard.classList.remove('card--featured');

    const winner = usePoints ? pointsCard : cashCard;
    winner.classList.add('card--featured');

    const titleEl = document.getElementById('recommendation-title');
    const textEl = document.getElementById('recommendation-text');

    if (usePoints) {
      titleEl.textContent = 'Recommendation: Use points for this booking';
      textEl.textContent = `You are achieving ${cpp.toFixed(2)}¢ per point, above the typical transfer range. This keeps cash in your pocket while maintaining value.`;
    } else {
      titleEl.textContent = 'Recommendation: Pay cash and save points';
      textEl.textContent = `At ${cpp.toFixed(2)}¢ per point, this redemption is below your target range. Save points for a higher value route or premium cabin.`;
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateResults();
  });

  document.addEventListener('DOMContentLoaded', updateResults);
};

initCashVsPoints();
