CREATE TABLE ${schema}.language
(
    id             SERIAL PRIMARY KEY,
    title          VARCHAR(50) NOT NULL,
    code           VARCHAR(10) NOT NULL UNIQUE,
    status         INT NOT NULL DEFAULT 0,
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);