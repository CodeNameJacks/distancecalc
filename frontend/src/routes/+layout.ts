/*import type { LayoutLoad } from './$types';*/
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { setLocale } from '../i18n/i18n-svelte';

export const load = async (event:any) => {
    const locale = 'en';
    await loadLocaleAsync(locale);
    setLocale(locale);

    return event.data;
};