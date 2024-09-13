import axios from 'axios';
import CryptoModel from '../models/CryptoModel.js';

const dataController = {
  fetchCryptoData: async (req, res) => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = response.data;

      const top10Cryptos = Object.keys(data)
        .slice(0, 10)
        .map((key) => {
          const crypto = data[key];
          return {
            name: crypto.name,
            last: crypto.last,
            buy: crypto.buy,
            sell: crypto.sell,
            volume: crypto.volume,
            base_unit: crypto.base_unit
          };
        });

      await CryptoModel.saveCryptoData(top10Cryptos);

      res.status(200).json({
        message: 'Data saved successfully!',
        data: top10Cryptos
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  },
};

export default dataController;
