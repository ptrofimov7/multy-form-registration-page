import { FC } from "react";
import { useTranslation } from "react-i18next";

import * as Styled from "./Header.styles";
import { Select } from "../../app/ui-components";

const data = [{
  value: 'Рус',
  label: 'Русский'
}, {
  value: 'Укр',
  label: 'Украинский'
}, {
  value: 'Анг',
  label: 'Английский'
}]

const mapLangValue = {
  ru: 'Рус',
  ua: 'Укр',
  en: 'Анг',
  default: 'Рус'
}

const mapValueLang = {
  'Рус': 'ru',
  'Укр': 'ua',
  'Анг': 'en',
  default: 'ru'
}

const Header: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Styled.HeaderContainer>
      <Select id="language" sx={{ width: '100px', paddingInline: 0 }} data={data} required={false}
        value={(mapLangValue?.[i18n.language as keyof typeof mapLangValue] || mapLangValue.default)}
        onChange={(value) => {
          i18n.changeLanguage((mapValueLang?.[value as keyof typeof mapValueLang] || mapValueLang.default));
        }} />
    </Styled.HeaderContainer>
  );
};

export default Header;
