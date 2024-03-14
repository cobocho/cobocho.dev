import debounce from 'lodash.debounce';
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

import { searchFormContainer, searchFormInput } from './SearchForm.css';

interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
}

const debounceDelay = 200;

const SearchForm = ({ setQuery }: Props) => {
  const changeQuery: ChangeEventHandler<HTMLInputElement> = debounce((e) => {
    setQuery(e.target.value);
  }, debounceDelay);

  return (
    <div className={searchFormContainer}>
      <input
        placeholder="검색할 제목을 입력해주세요"
        className={searchFormInput}
        onChange={changeQuery}
      />
    </div>
  );
};

export default SearchForm;
