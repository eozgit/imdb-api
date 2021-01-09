cd /workspace/setup
wget -i list.txt
gzip -d *.gz
mongoimport --type tsv --db imdb --headerline --collection movies --file setup/title.basics.tsv
mongoimport --type tsv --db imdb --headerline --collection actors --file setup/name.basics.tsv
mongoimport --type tsv --db imdb --headerline --collection actorsMovies --file setup/title.principals.tsv
mongoimport --type tsv --db imdb --headerline --collection ratings --file setup/title.ratings.tsv