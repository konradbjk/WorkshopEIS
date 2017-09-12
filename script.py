import pandas as pd
from pymongo import MongoClient



def _connect_mongo(host, port, db):
    mongo_str = 'mongodb://%s:%s/%s' % (host, port, db)
    client = MongoClient(mongo_str)
    return client[db]

def read_mongo(db, collection, query={}, host = 'localhost', port = 27017, no_id = True):
    """Read from MongoDB and store into DataFrame"""

    # Connect to MongoDB
    db = _connect_mongo(host = host, port = port, db = db)

    # Query to specific DB and collection
    collection = db[collection].find(query)

    # Create DataFrame
    global df
    df = pd.DataFrame(list(collection))

    # Delete the _id
    if no_id:
        del df['_id']

read_mongo('workshopdb','zapis1',{}, '192.168.84.17')

print(df.head())
