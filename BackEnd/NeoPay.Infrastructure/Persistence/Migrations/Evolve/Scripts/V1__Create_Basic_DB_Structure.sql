CREATE TABLE ${schema}.customer
(
    id             SERIAL PRIMARY KEY,
    first_name     VARCHAR(150) NOT NULL,
    last_name      VARCHAR(150) NOT NULL,
    email          VARCHAR(120),
    phone          VARCHAR(30),
    account_nr     INT,
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.address
(
    id             SERIAL PRIMARY KEY,
    country        VARCHAR(100),
    region         VARCHAR(100),
    city           VARCHAR(100),
    street         VARCHAR(150),
    house          VARCHAR(20),
    entrance       VARCHAR(20),
    apartment      VARCHAR(20),
    postal_code    VARCHAR(20),
    customer_id    INT REFERENCES ${schema}.customer (id),
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.unit
(
    id             SERIAL PRIMARY KEY,
    code           VARCHAR(50),
    long_name      VARCHAR(100),
    description    VARCHAR(255),
    symbol         VARCHAR(50),
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.utility
(
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    unit_id        INT NOT NULL REFERENCES ${schema}.unit (id),
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.connection
(
    id             SERIAL PRIMARY KEY,
    customer_id    INT NOT NULL REFERENCES ${schema}.customer (id),
    utility_id     INT NOT NULL REFERENCES ${schema}.utility (id),
    status         INT NOT NULL,
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.meter
(
    id             SERIAL PRIMARY KEY,
    connection_id  INT                 NOT NULL REFERENCES ${schema}.connection (id),
    serial_number  VARCHAR(100) UNIQUE NOT NULL,
    status         INT                 NOT NULL,
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ${schema}.consumption_record
(
    id             SERIAL PRIMARY KEY,
    meter_id       INT            NOT NULL REFERENCES ${schema}.meter (id),
    amount_used    NUMERIC(10, 2) NOT NULL,
    created_on_utc TIMESTAMPTZ DEFAULT now(),
    updated_on_utc TIMESTAMPTZ DEFAULT now()
);