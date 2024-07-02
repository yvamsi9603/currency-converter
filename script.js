const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');

const countries = [
    {code: "USD", name: "United States Dollar"},
    {code: "INR", name: "Indian Rupee"},
    {code: "EUR", name: "Euro"},
    {code: "GBP", name: "British Pound Sterling"},
    {code: "JPY", name: "Japanese Yen"},
    {code: "CAD", name: "Canadian Dollar"},
    {code: "AUD", name: "Australian Dollar"},
    {code: "CHF", name: "Swiss Franc"},
    {code: "CNY", name: "Chinese Yuan"},
    {code: "SEK", name: "Swedish Krona"},
    {code: "NZD", name: "New Zealand Dollar"},
    {code: "MXN", name: "Mexican Peso"},
    {code: "SGD", name: "Singapore Dollar"},
    {code: "HKD", name: "Hong Kong Dollar"},
    {code: "NOK", name: "Norwegian Krone"},
    {code: "KRW", name: "South Korean Won"},
    {code: "TRY", name: "Turkish Lira"},
    {code: "RUB", name: "Russian Ruble"},
    {code: "BRL", name: "Brazilian Real"},
    {code: "ZAR", name: "South African Rand"},
    {code: "PHP", name: "Philippine Peso"},
    {code: "CZK", name: "Czech Koruna"},
    {code: "PLN", name: "Polish Zloty"},
    {code: "DKK", name: "Danish Krone"},
    {code: "MYR", name: "Malaysian Ringgit"},
    {code: "THB", name: "Thai Baht"},
    {code: "IDR", name: "Indonesian Rupiah"},
    {code: "HUF", name: "Hungarian Forint"},
    {code: "AED", name: "United Arab Emirates Dirham"},
    {code: "SAR", name: "Saudi Riyal"},
    {code: "ILS", name: "Israeli New Shekel"},
    {code: "CLP", name: "Chilean Peso"},
    {code: "PKR", name: "Pakistani Rupee"},
    {code: "EGP", name: "Egyptian Pound"},
    {code: "BDT", name: "Bangladeshi Taka"},
    {code: "NGN", name: "Nigerian Naira"},
    {code: "KWD", name: "Kuwaiti Dinar"},
    {code: "QAR", name: "Qatari Rial"},
    {code: "OMR", name: "Omani Rial"},
    {code: "BHD", name: "Bahraini Dinar"},
    {code: "LKR", name: "Sri Lankan Rupee"},
    {code: "JOD", name: "Jordanian Dinar"},
    {code: "KES", name: "Kenyan Shilling"},
    {code: "TZS", name: "Tanzanian Shilling"},
    {code: "UGX", name: "Ugandan Shilling"},
    {code: "GHS", name: "Ghanaian Cedi"},
    {code: "MAD", name: "Moroccan Dirham"},
    {code: "DZD", name: "Algerian Dinar"}
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    option1.value = country.code;
    option1.textContent = `${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = country.code;
    option2.textContent = `${country.code} (${country.name})`;
    toCurrencyElement.appendChild(option2);
});

// Set default values
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "INR";

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/2fd4c92179fc9ae31e20d925/latest/${fromCurrency}`);
        const data = await response.json();

        if (response.ok) {
            const conversionRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * conversionRate).toFixed(2);
            convertedAmountElement.value = convertedAmount;
            resultElement.textContent = `1 ${fromCurrency} = ${conversionRate} ${toCurrency}`;
        } else {
            resultElement.textContent = "Error fetching exchange rate.";
        }
    } catch (error) {
        resultElement.textContent = "Network error. Please try again later.";
    }
};

// Set initial conversion rate
getExchangeRate();

// Add event listeners
fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
