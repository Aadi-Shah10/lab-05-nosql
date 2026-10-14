#!/usr/bin/env python3

import os
import json
from token import NEWLINE
from pymongo import MongoClient

MONGODB_ATLAS_URL = os.getenv('MONGODB_ATLAS_URL')
MONGODB_ATLAS_USER = os.getenv('MONGODB_ATLAS_USER')
MONGODB_ATLAS_PWD = os.getenv('MONGODB_ATLAS_PWD')

def main():
    client = MongoClient(MONGODB_ATLAS_URL, username=MONGODB_ATLAS_USER, password=MONGODB_ATLAS_PWD)
    db = client['bookstore']
    authors = db['authors']
    books = db['books']
    author_ids = ['author_002', 'author_003', 'author_004']
    total = authors.count_documents({'_id': {'$in': author_ids}})
    print(f"Total authors: {total}")
    for author in authors.find({'_id': {'$in': author_ids}}):
            print(f"\n{author['name']}")
            for book in books.find({'author_ids': author['_id']}):
                print(f"{book['title']} ({book['published_year']})")  
    client.close()  
    
if __name__ == "__main__":
    main()