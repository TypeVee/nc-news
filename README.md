Please add the enviroment variable files, .env.test & .env.development to the root of this repo.

.env.test Should contain:        PGDATABASE=nc_news_test
.env.development Should contain: PGDATABASE=nc_news

Alternatively, run the following command:

echo "PGDATABASE=nc_news_test" > .env.test & echo "PGDATABASE=nc_news" > .env.development