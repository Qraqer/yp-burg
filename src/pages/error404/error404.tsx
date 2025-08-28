import { Link } from 'react-router-dom';

import type { FC } from 'react';

export const Error404: FC = (): React.JSX.Element => {
  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <div className={'text text_type_main-large'}>Страница не найдена</div>
        <div className="form__links">
          <div className="form__link">
            <Link to={'/'} className={'link'}>
              Вернуться в бургерную
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
