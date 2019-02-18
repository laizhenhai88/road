source ../../_props.sh

docker container start $NAME
docker container exec -w /root/project/$PROJECT $NAME ln -s /usr/local/bin/python3 /usr/bin/python3
docker container exec -w /root/project/$PROJECT $NAME npm run docker
