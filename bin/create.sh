source ../../_props.sh

docker container create \
 --name $NAME \
 -p $PORT:7002 \
 -m $MEM \
 --volume "$PWD/../../":/root/project \
 --volume "$PWD/../../data/db":/data/db \
 --volume "$PWD/../../data/configdb":/data/configdb \
 --volume "$PWD/../../logs":/root/logs \
 --volume /root/project/pil:/root/project/pil \
 --volume /root/project/res:/root/project/res \
 --volume /root/project/resBak:/root/project/resBak \
 hongyusir/mnpp:1.0 --wiredTigerCacheSizeGB $MGCACHE
