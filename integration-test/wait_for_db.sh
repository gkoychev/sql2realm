#!/usr/bin/env bash
# wait until MySQL is really available
maxcounter=30
 
# echo $MYSQL_USER
# echo $MYSQL_PASSWORD

counter=1
while ! mysql --protocol TCP -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "show databases;" > /dev/null 2>&1; do
    counter=`expr $counter + 1`
    if [ $counter -gt $maxcounter ]; then
        >&2 echo "We have been waiting for MySQL too long already; failing."
        exit 1
    fi;
    echo "waiting for DB $counter"
    sleep 2
done