CREATE KEYSPACE IF NOT EXISTS FDC
    WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE FDC;

CREATE TABLE IF NOT EXISTS MovieInfo(
    id int,
    movieId int,
    actorId int,
    PRIMARY KEY ((movieId), id)
    );

COPY MovieInfo(id, movieId, actorId) FROM '/Users/umaabrami/Desktop/HRR37/hrr37-SDC/cast-and-crew-Daniel/movieData.csv' WITH HEADER = TRUE AND NUMPROCESSES = 32 AND CHUNKSIZE = 1000 AND MAXBATCHSIZE = 20;
