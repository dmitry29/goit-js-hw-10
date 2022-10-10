import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

/*Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.
 */
import { fetchCountries } from './fetchCountries';

// Достаём елементы
const refs = {
    inputForm: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
// Применить приём Debounce
refs.inputForm.addEventListener('input',
    debounce(onInputChenge, DEBOUNCE_DELAY));

    // Cанитизация введенной строки методом trim()
async function onInputChenge() {
    const name = refs.inputForm.value.trim();
    if (name === '') {
        return ((refs.countryList.innerHTML = ''),
            (refs.countryInfo.innerHTML = ''));
    }

    // Связываем логику с функционалом
    const data = await fetchCountries(name);
    console.log(data);
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    try {
           
        // Интерфейс с помощъю библиотеки Notiflix
        if (data.length > 10) {
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        } else if (data.length < 10 && data.length >= 2) {
            refs.countryList.insertAdjacentHTML(
                'beforeend',
                renderCountryList(data)
            );
        } else {
            refs.countryInfo.insertAdjacentHTML(
                'beforeend',
                renderCountryInfo(data)
            );
        }
    }

    catch {

        Notiflix.Notify.failure('Oops, there is no country with that name');
        return [];
           
    }
            
}
            
// Оформили флаг и название страни
function renderCountryList(contries) {
    return contries
        .map(({ flags, name }) => {
            return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 50px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
        })
        .join('');
}

// Оформили список Фильтрация полей c информацией
 
function renderCountryInfo(contries) {
    return contries
        .map(({ flags, name, capital, population, languages }) => { 
            return `
      <img width="50px" height="50px" src='${flags.svg}' 
      alt='${name.official} flag' />
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Name: </b>${name.official}</p></li>
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages)}</p></li>
        </ul>
        `;
        })
    .join('');
}