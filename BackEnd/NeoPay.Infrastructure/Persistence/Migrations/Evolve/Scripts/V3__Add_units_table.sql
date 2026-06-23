CREATE TABLE ${schema}.unit
(
    id             SERIAL PRIMARY KEY,
    title          VARCHAR(100),
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);