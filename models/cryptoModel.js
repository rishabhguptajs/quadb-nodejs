import sql from '../config/db.js';

const CryptoModel = {
  saveCryptoData: async (cryptos) => {
    try {
      for (const crypto of cryptos) {
        await sql`
          INSERT INTO cryptos (name, last, buy, sell, volume, base_unit)
          VALUES (${crypto.name}, ${crypto.last}, ${crypto.buy}, ${crypto.sell}, ${crypto.volume}, ${crypto.base_unit})
          ON CONFLICT (name) DO UPDATE
          SET 
            last = EXCLUDED.last, 
            buy = EXCLUDED.buy, 
            sell = EXCLUDED.sell, 
            volume = EXCLUDED.volume, 
            base_unit = EXCLUDED.base_unit;
        `;
      }
      console.log('Cryptocurrency data saved successfully');
    } catch (error) {
      console.error('Error saving cryptocurrency data:', error);
      throw error;
    }
  },

  getCryptoData: async () => {
    try {
      const cryptos = await sql`SELECT * FROM cryptos`;
      return cryptos;
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      throw error;
    }
  }
};

export default CryptoModel;
