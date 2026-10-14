1. // Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
db.authors.find()
db.books.find()
// Step 6: insert two new books
db.books.insertMany([ { title: 'Emma', published_year: 1815, author_ids: ['author_001'] }, { title:'A Christmas Carol', published_year: 1843, author_ids: ['author_004'] } ])

// Step 7: add missing authors
db.authors.insertMany([ {_id: "author_004", name: "Charles Dickens", nationality: 'British', bio: {short: 'English writer and journalist in the Victorian era.', long: 'Charles Dickens was an English writer and journalist in the Victorian era who created some of the best known characters in literature. He wrote The Pickwick Papers, Oliver Twist, Nicholas Nickleby, and A Christmas Carol.'} } ])

// Step 8: filter books by a list of authors
db.books.find({ author_iauthor_ids: { $in: ["author_001", "author_004"] } })
