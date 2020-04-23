#!/usr/bin/env python

from ont_fast5_api.fast5_file import Fast5File

import json
import random
import statistics
import sys
import time


# CONFIG VARIABLES FOR DEPLOYMENT
EXEC = '/path/to/exec'
DB = './db.fast5'



if __name__ == "__main__":
    t0 = time.time()

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

    with Fast5File(DB, 'r') as fast5:
        cur = list(fast5.get_raw_data(scale=True))
        cur = [float(x) for x in cur]
        mean = statistics.mean(cur)
        sd = statistics.stdev(cur)
        cur = [round((x - mean) / sd, 2) for x in cur]

        L = []

        for x in range(random.randint(0, 5)):
            res = {}

            pos = random.randint(0, len(cur) - 10)
            res["Read"] = cur[pos:]

            t = round(time.time() - t0, 6)
            t0 = time.time()

            res["Name"] = fast5.get_read_id()
            res["Confidence"] = 0.9 - (0.05 * x)
            res["Time"] = t

            L.append(res)


        j = json.dumps(L)

        print(L)
