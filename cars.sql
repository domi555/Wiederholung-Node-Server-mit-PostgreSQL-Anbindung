--
-- dominikpalatinQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: dominikpalatin
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    title text,
    image text NOT NULL,
    status text,
    price numeric,
    miles integer,
    year_of_make smallint,
    description text NOT NULL,
    owner integer,
    CONSTRAINT cars_miles_check CHECK ((miles < 200000)),
    CONSTRAINT cars_price_check CHECK ((price > (1000)::numeric)),
    CONSTRAINT cars_status_check CHECK ((status = ANY (ARRAY['available'::text, 'sold'::text, 'reserved'::text]))),
    CONSTRAINT cars_year_of_make_check CHECK (((year_of_make)::double precision <= date_part('year'::text, now())))
);


ALTER TABLE public.cars OWNER TO dominikpalatin;

--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: dominikpalatin
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO dominikpalatin;

--
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dominikpalatin
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- Name: owner; Type: TABLE; Schema: public; Owner: dominikpalatin
--

CREATE TABLE public.owner (
    id integer NOT NULL,
    first_name text,
    last_name text
);


ALTER TABLE public.owner OWNER TO dominikpalatin;

--
-- Name: owner_id_seq; Type: SEQUENCE; Schema: public; Owner: dominikpalatin
--

CREATE SEQUENCE public.owner_id_seq
    AS integer
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.owner_id_seq OWNER TO dominikpalatin;

--
-- Name: owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dominikpalatin
--

ALTER SEQUENCE public.owner_id_seq OWNED BY public.owner.id;


--
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: dominikpalatin
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- Name: owner id; Type: DEFAULT; Schema: public; Owner: dominikpalatin
--

ALTER TABLE ONLY public.owner ALTER COLUMN id SET DEFAULT nextval('public.owner_id_seq'::regclass);


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: dominikpalatin
--

INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (1, 'Top Deal Of Week!', 'http://localhost:3000/images/car1.png', 'available', 189455, 11321, 2020, 'Perfect condition, lots of extras!', 1);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (2, 'Bargain!', 'http://localhost:3000/images/car2.png', 'available', 8700, 113666, 2007, 'A bit worn, but still drives. For the adventurous person who is willing to take risks and eager to have new experiences.', 2);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (3, 'Fair Price', 'http://localhost:3000/images/car3.png', 'available', 91170, 45128, 2017, 'Stylish car. Good condition.', 3);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (4, 'Fair Price', 'http://localhost:3000/images/car4.png', 'reserved', 12333, 98301, 2013, 'Allround car. You can''t go wrong with this car. ', 4);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (5, 'Best Offer!', 'http://localhost:3000/images/car5.png', 'available', 182900, 42711, 2019, 'Fast as a shark.', 5);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (6, 'Great Value!', 'http://localhost:3000/images/car6.png', 'sold', 145322, 52811, 2018, 'Mint condition.', 6);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (7, 'Best Deal Ever!', 'http://localhost:3000/images/car7.png', 'available', 213860, 12800, 2020, 'A racing car.', 1);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (8, 'Fair Price', 'http://localhost:3000/images/car8.png', 'available', 112921, 100800, 2016, 'A stylish car. Good condition', 7);
INSERT INTO public.cars (id, title, image, status, price, miles, year_of_make, description, owner) VALUES (9, 'Luxury for You!', 'http://localhost:3000/images/car9.png', 'reserved', 412222, 13900, 2015, 'British style.', 8);


--
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: dominikpalatin
--

INSERT INTO public.owner (id, first_name, last_name) VALUES (1, 'Robert', 'Baumgartner');
INSERT INTO public.owner (id, first_name, last_name) VALUES (2, 'Moritz', 'Miedler');
INSERT INTO public.owner (id, first_name, last_name) VALUES (3, 'Benjamin', 'Gruber');
INSERT INTO public.owner (id, first_name, last_name) VALUES (4, 'Ivan', 'Orsolic');
INSERT INTO public.owner (id, first_name, last_name) VALUES (5, 'Dominik', 'Palatin');
INSERT INTO public.owner (id, first_name, last_name) VALUES (6, 'Haroon', 'Younas');
INSERT INTO public.owner (id, first_name, last_name) VALUES (7, 'Victor', 'Pawlek');
INSERT INTO public.owner (id, first_name, last_name) VALUES (8, 'Sebastian', 'Lang');
INSERT INTO public.owner (id, first_name, last_name) VALUES (9, 'Filip', 'Wojtasik');
INSERT INTO public.owner (id, first_name, last_name) VALUES (10, 'Max', 'Blam');


--
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dominikpalatin
--

SELECT pg_catalog.setval('public.cars_id_seq', 10, true);


--
-- Name: owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dominikpalatin
--

SELECT pg_catalog.setval('public.owner_id_seq', 11, true);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: dominikpalatin
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: owner owner_pkey; Type: CONSTRAINT; Schema: public; Owner: dominikpalatin
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT owner_pkey PRIMARY KEY (id);


--
-- Name: cars cars_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dominikpalatin
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_owner_fkey FOREIGN KEY (owner) REFERENCES public.owner(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- dominikpalatinQL database dump complete
--

