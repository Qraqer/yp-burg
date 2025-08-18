import { Link } from 'react-router-dom';

export const Error404 = (): React.JSX.Element => {
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
