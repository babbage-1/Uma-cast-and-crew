CREATE KEYSPACE IF NOT EXISTS FDC
    WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor' : 3};

USE FDC;

  CREATE TABLE IF NOT EXISTS  ActorInfo(
    id int PRIMARY KEY,
    name varchar,
    title varchar,
    role varchar,
    photo varchar,
    bio varchar,
    filmography set <varchar>,
      );

COPY ActorInfo(id, name, title, role, photo, bio,filmography) FROM '/Users/umaabrami/Desktop/HRR37/hrr37-SDC/cast-and-crew-Daniel/actorData.csv' WITH HEADER = TRUE AND NUMPROCESSES = 32 AND CHUNKSIZE = 1000 AND MAXBATCHSIZE = 20;