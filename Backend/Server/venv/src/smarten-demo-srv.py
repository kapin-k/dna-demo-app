#!/usr/bin/env python

import json
import subprocess
import sys


# CONFIG VARIABLES FOR DEPLOYMENT
EXEC = './db-search'
SIGNIFICANCE = 0.9


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("error: pass query as a single json string")
        sys.exit(-1)

    
    qd = json.loads(sys.argv[1])

    if not 'Read' in qd:
        print("error: json must provide array named Read")
        sys.exit(-1)

    query = qd['Read']

    if len(query) < 2:
        print("error: query to short")
        sys.exit(-1)

    CALL = [EXEC] + [str(x) for x in query]
    res = subprocess.check_output(CALL).decode('ascii')

    R = res.split('%\n')[:-1]
    L = [dict(x.split('\t') for x in res.split('\n')[:-1]) for res in R]

    for x in L:
        l = x['Read']
        x['Read'] = [float(x) for x in l.split(' ')[:-1]]
        l = x['Confidence']
        x['Confidence'] = float(l)
        l = x['Time']
        x['Time'] = float(l)

    L = [x for x in L if (x['Confidence'] > SIGNIFICANCE)]

    print(json.dumps(L))
