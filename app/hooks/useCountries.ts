import countries from 'world-countries'

const formatedCountries = countries.map((c) => ({
    value: c.cca2,
    label: c.name.common,
    flag: c.flag,
    latlng: c.latlng,
    region: c.region
}));

const useCountries = () => {
    const getAll = () => formatedCountries;

    const getByValue = (value: string) => {
        return formatedCountries.find((item) => item.value === value);
    }

    return {getAll, getByValue}
}

export default useCountries