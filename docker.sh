#!/bin/bash

docker build -t plathome-frontend .
docker run -p 3200:3000 plathome-frontend
