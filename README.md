# equipe-toi

# Lancer le projet
```
docker-compose build
docker-compose up -d
```

Se rendre sur http://localhost:3000


# Sans docker-compose
## Builder
```
docker build -t node-equipe-toi .
```
## Puis runner 
```
docker run -d \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node-equipe-toi
```


# Sans docker
```
npm install
npm start
```

Se rendre sur http://localhost:3000


