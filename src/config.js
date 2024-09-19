const prod = {
    url: {
        API_URL: `https://api.github.com`
    }
};
const dev = {
    url: {
        API_URL: `https://private-e2697-arzusuleymanova.apiary-mock.com`
    }
};
export const config = process.env.NODE_ENV === `development` ? dev : prod;