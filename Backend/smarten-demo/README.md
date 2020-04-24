# SMARTEn Server Demo

The server consists of three components:

1. `smarten-demo-srv.py` which is the key proxy element handling/dispathcing incoming queries.
2. `db-search` which is the actual search engine that extract best match for given query.
3. Database files `db.names` and `db.sigs` that are used by `db-search` for querying.

#### smarten-demo-srv.py

`smarten-demo-srv.py` must be configured such that `EXEC` variable points to the location of `db-search`. It is recommeded that `db-search` resides in the same directory as database files and `smarten-demo-srv.py`.

#### db-search

Currently, `db-search` is a small C++17 application that has to be compiled on the deployment host. Here any modern C++ compiler can be used. The easiest is to use `gcc`. To compile just run `make`. To customize compilation, e.g., to change compiler simply edit `Makefile`.

#### Database files

We package ready to use database files and corresponding example query sequences in `Preset.json`.

New database and the corresponding presets can be generated using attached `maked-db` and `make-ref` tools. As this is somewhat advanced topic, we leave this is as an excercise to the reader.