import i18next from 'i18next';
import global_de from "../../common/translations/de/global.json"

i18next.init({
    interpolation: {
      escapeValue: false
    }, lng: "de", resources: {
      de: {
        global: global_de
      }
    }
  })

export default i18next;