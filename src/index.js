import debounce from 'lodash.debounce';
import './css/style.css';
import refs from './js/refs';
import countryInfoTpl from './templates/countryInfo.hbs';
import countryListTpl from './templates/countryList.hbs';
import createInfo from './js/createTplFn';
import fetchCountries from './js/fetchCountries';
import { alert, defaultModules, notice } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core';
import pnotifyMessage from './js/pnotifyFn';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

refs.input.addEventListener('input', debounce(renderFn, 500));

function renderFn(e) {
    const searchQuery = e.target.value;
    fetchCountries(searchQuery).then(data => {

        if (data.length > 10) {
            refs.ul.innerHTML = '';
            return pnotifyMessage(alert, "Найдено много совпадений, уточните запрос");
        }

        if (data.length <= 10 && data.length > 1) {
            return refs.ul.innerHTML = createInfo(data, countryListTpl);
        }
            
        if (data.length === 1) {
            return refs.ul.innerHTML = createInfo(data, countryInfoTpl);
        }
    })
        .catch(() => {
            refs.ul.innerHTML = '';
            return pnotifyMessage(error, "Начните вводить имя страны");
        });
};
