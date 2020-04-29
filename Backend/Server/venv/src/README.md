# SMARTEn Server Demo

The server consists of three components:

1. `smarten-demo-srv.py`, which is the key proxy element handling/dispatching incoming queries.
2. `db-search`, which is the actual search engine that extracts best matches for a given query.
3. Database files named `db.names` and `db.sigs`, which are used by `db-search` for querying.


#### smarten-demo-srv.py

`smarten-demo-srv.py` must be configured such that `EXEC` variable points to the location of `db-search`. It is recommeded that `db-search` resides in the same directory as the database files and `smarten-demo-srv.py` itself. Additionally, you can change `SIGNIFICANCE` threshold: only results with `Confidance` above the `SIGNIFICANCE` will be reported. The current default should work well in practice.


#### db-search

Currently, `db-search` is a small C++17 application that has to be compiled on the deployment host. Here any modern C++ compiler can be used. The easiest way is to use `gcc`. To compile just run `make`. To customize compilation, e.g., to change compiler, simply edit `Makefile`.


#### Database files

We package ready to use database files and corresponding example query sequences in `Preset.json`.

New database and the corresponding presets can be generated using attached `maked-db` and `make-ref` tools. As this is somewhat advanced topic, we leave this is as an excercise to the reader.
