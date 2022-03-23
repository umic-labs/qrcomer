import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import pt_BR from './pt-BR.json'

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      'pt-BR': {
        translation: pt_BR
      }
    },
    lng: "pt-BR", 
    fallbackLng: "pt-BR",

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n