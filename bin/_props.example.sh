# create _props.sh at root dir of dist

# define the project name, yes, it is the git project name
export PROJECT=douy
# define the container name, eg. kg1 kg2
export NAME=$PROJECT-douyX
# define the localhost service port, eg. 7002 7003
export PORT=7002
# define the memory
export MEM=300m
# mongo maximum amount of memory to allocate for cache; defaults to 1/2 of physical RAM(GB), eg. 1 0.5
export MGCACHE=0.25


echo container $NAME at port $PORT mem $MEM
