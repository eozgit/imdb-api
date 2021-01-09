cd /workspace/dataset
wget -i list.txt
gzip -d *.gz
mongoimport --type tsv --db imdb --headerline --collection movies --file dataset/title.basics.tsv
mongoimport --type tsv --db imdb --headerline --collection actors --file dataset/name.basics.tsv
mongoimport --type tsv --db imdb --headerline --collection actorsMovies --file dataset/title.principals.tsv
mongoimport --type tsv --db imdb --headerline --collection ratings --file dataset/title.ratings.tsv