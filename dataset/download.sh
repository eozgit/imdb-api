cd /workspace/dataset
wget -i list.txt
gzip -d *.gz
mongoimport --type tsv --db imdb --headerline --collection basics --file dataset/title.basics.tsv
mongoimport --type tsv --db imdb --headerline --collection ratings --file dataset/title.ratings.tsv
mongoimport --type tsv --db imdb --headerline --collection principals --file dataset/title.principals.tsv
mongoimport --type tsv --db imdb --headerline --collection names --file dataset/name.basics.tsv