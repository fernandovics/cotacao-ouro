export default async function handler(req, res) {
    const { type } = req.query; // "latest" or "history"

    const symbols = ['GC=F', 'BRL=X'];
    const range = type === 'history' ? '1mo' : '1d';
    const interval = '1d';

    try {
        const results = await Promise.all(
            symbols.map(async (symbol) => {
                const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
                const response = await fetch(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });

                if (!response.ok) throw new Error(`Yahoo API error for ${symbol}: ${response.status}`);

                const data = await response.json();
                const result = data.chart.result[0];
                const meta = result.meta;
                const quote = result.indicators.quote[0];

                if (type === 'history') {
                    return {
                        symbol,
                        timestamps: result.timestamp,
                        closes: quote.close
                    };
                }

                return {
                    symbol,
                    price: meta.regularMarketPrice,
                    previousClose: meta.chartPreviousClose,
                    dayHigh: meta.regularMarketDayHigh,
                    dayLow: meta.regularMarketDayLow,
                    marketTime: meta.regularMarketTime
                };
            })
        );

        const gold = results.find(r => r.symbol === 'GC=F');
        const dollar = results.find(r => r.symbol === 'BRL=X');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
        res.status(200).json({ gold, dollar, source: 'Yahoo Finance' });

    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: err.message });
    }
}
